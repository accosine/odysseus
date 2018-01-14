const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const Theme = require('nausicaa').default;

const theme = Theme(functions.config());

admin.initializeApp(functions.config().firebase);

const pagerSize = functions.config().pager.size;

const firestore = admin.firestore();
const articles = firestore.collection('articles');

app.use(cors);
app.use(cookieParser);

app.get('/', (req, res) => {
  Promise.all(
    Object.keys(collections).map(collectionName =>
      articles
        .select('slug', 'headline', 'subline', 'picture', 'attribution', 'alt')
        .orderBy('slug')
        .where('collection', '==', collectionName)
        .limit(5)
        .get()
        .then(documentSnapshots => ({
          articles: documentSnapshots.docs.map(article => article.data()),
          collection: collectionName,
        }))
    )
  )
    .then(articles => res.send(theme.start(articles)))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

const paginationHandler = collectionName => (req, res) => {
  const page = req.params.page || 1;
  articles
    .select()
    .where('collection', '==', collectionName)
    .get()
    .then(emptySelectSnapshot =>
      articles
        .select('slug', 'headline', 'subline', 'picture', 'attribution', 'alt')
        .orderBy('slug')
        .where('collection', '==', collectionName)
        .offset((page - 1) * pagerSize)
        .limit(pagerSize)
        .get()
        .then(documentSnapshots => {
          const articles = documentSnapshots.docs.map(article =>
            article.data()
          );
          res.send(
            theme.portal(articles, {
              collection: collectionName,
              pagination: {
                currentPage: parseInt(page, 10),
                pagerSize,
                articleCount: emptySelectSnapshot.docs.length,
              },
            })
          );
        })
    )
    .catch(err => {
      console.error(err);
      res.status(500).send('Something broke!');
    });
};

const collections = functions.config().collections;
Object.keys(collections).forEach(collectionName => {
  const collectionPath = collections[collectionName];

  app.get(`/${collectionPath}`, paginationHandler(collectionName));

  app.get(`/${collectionPath}/:page(\\d+)`, paginationHandler(collectionName));

  app.get(`/${collectionPath}/:slug`, (req, res) => {
    articles
      .doc(req.params.slug)
      .get()
      .then(doc => {
        if (doc.exists) {
          const article = doc.data();
          if (article.collection !== collectionName) {
            return res.status(404).send('Article Not Found');
          }
          res.send(theme.article(article.content, article));
        } else {
          res.send('No such document!');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Something broke!');
      });
  });
});

app.get('/:page', (req, res) => {
  res.send('page: ' + req.params.page);
});

exports.app = app;
