const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const Theme = require('nausicaa').default;

const theme = Theme(functions.config());

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
const articles = firestore.collection('articles');

const PAGE_SIZE = 3;

app.use(cors);
app.use(cookieParser);

app.get('/', (req, res) => {
  res.send('Start');
});

const collections = functions.config().collections;
Object.keys(collections).forEach(collectionName => {
  const collectionPath = collections[collectionName];

  app.get(`/${collectionPath}`, (req, res) => {
    articles
      .orderBy('slug')
      .where('collection', '==', collectionName)
      .limit(PAGE_SIZE)
      .get()
      .then(documentSnapshots => {
        const articles = documentSnapshots.docs.map(
          article => article.data().slug
        );
        res.send(JSON.stringify(articles));
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  app.get(`/${collectionPath}/:page(\\d+)`, (req, res) => {
    articles
      .orderBy('slug')
      .where('collection', '==', collectionName)
      .offset((req.params.page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .get()
      .then(documentSnapshots => {
        const articles = documentSnapshots.docs.map(
          article => article.data().slug
        );
        res.send(JSON.stringify(articles));
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Something broke!');
      });
  });

  app.get(`/${collectionPath}/:slug`, (req, res) => {
    // TODO: empty select() for collection length
    articles
      .doc(req.params.slug)
      .get()
      .then(doc => {
        if (doc.exists) {
          const article = doc.data();
          if (article.collection !== collectionName) {
            return res.status(404).send('Article Not Found');
          }
          res.send(theme(article.content, article));
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
