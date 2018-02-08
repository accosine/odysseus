const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const Theme = require('nausicaa').default;

const theme = Theme(functions.config().application);

admin.initializeApp(functions.config().firebase);

const pagerSize = functions.config().application.pager.size;

const firestore = admin.firestore();
const articles = firestore.collection('articles');

app.use(cors);
app.use(cookieParser);

app.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.get('/', (req, res) => {
  Promise.all(
    Object.keys(collections).map(collection =>
      articles
        .select('slug', 'headline', 'subline', 'picture', 'attribution', 'alt')
        .orderBy('slug')
        .where('collection', '==', collection)
        .limit(5)
        .get()
        .then(documentSnapshots => ({
          articles: documentSnapshots.docs.map(article => article.data()),
          collection: collection,
        }))
    )
  )
    .then(articles => res.send(theme.start(articles)))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

const paginationHandler = collection => (req, res) => {
  const page = req.params.page || 1;
  articles
    .select()
    .where('collection', '==', collection)
    .get()
    .then(emptySelectSnapshot =>
      articles
        .select('slug', 'headline', 'subline', 'picture', 'attribution', 'alt')
        .orderBy('slug')
        .where('collection', '==', collection)
        .offset((page - 1) * pagerSize)
        .limit(parseInt(pagerSize, 10))
        .get()
        .then(documentSnapshots => {
          const articles = documentSnapshots.docs.map(article =>
            article.data()
          );
          res.send(
            theme.portal(articles, {
              collection: collection,
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

const collections = functions.config().application.collections;
Object.keys(collections).forEach(collection => {
  const collectionPath = collections[collection].slug;

  app.get(`/${collectionPath}`, paginationHandler(collection));

  app.get(`/${collectionPath}/:page(\\d+)`, paginationHandler(collection));

  app.get(`/${collectionPath}/:slug`, (req, res) => {
    articles
      .doc(req.params.slug)
      .get()
      .then(doc => {
        if (doc.exists) {
          const article = doc.data();
          if (article.collection !== collection) {
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
