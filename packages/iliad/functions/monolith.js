const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const Theme = require('nausicaa').default;

const theme = Theme(functions.config());

admin.initializeApp(functions.config().firebase);
console.log(functions.config());

const firestore = admin.firestore();
const articles = firestore.collection('articles');

app.use(cors);
app.use(cookieParser);
app.get('/hello', (req, res) => {
  res.send('Hello Yonkers');
});
app.get('/:collection/:slug', (req, res) => {
  articles
    .doc(req.params.slug)
    .get()
    .then(doc => {
      if (doc.exists) {
        const article = doc.data();
        res.send(theme(article.content, article));
      } else {
        res.send('No such document!');
      }
    })
    .catch(err => {
      res.status(500).send('Something broke!');
    });
});

exports.app = app;
