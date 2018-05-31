const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const fetcher = require('./data-fetcher');

admin.initializeApp();

const collections = functions.config().application.article.collections;
const caching = functions.config().application.caching;
const noindex = functions.config().application.noindex;

const firestore = admin.firestore();
const articles = firestore.collection('articles');
const pages = firestore.collection('pages');

app.use(cors);
app.use((req, res, next) => {
  if (req.url !== '/' && req.url.endsWith('/')) {
    return res.redirect(301, req.url.slice(0, -1));
  }
  res.set(
    'Cache-Control',
    `public, max-age=${caching.maxage}, s-maxage=${caching.servermaxage}`
  );
  next();
});
app.use(cookieParser);

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nDisallow:${noindex === 'true' ? ' /' : ''}`);
});

app.get('/:page(\\d+)', (req, res) => {
  fetcher
    .start(articles, req.params.page || 1)
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

Object.keys(collections).forEach(collection => {
  const collectionPath = collections[collection].slug;

  app.get(`/${collectionPath}(/:page(\\d+))?`, (req, res) => {
    fetcher
      .portal(articles, collection, req.params.page || 1)
      .then(doc => res.send(doc))
      .catch(err => {
        console.log(err);
        if (err.message === '404') {
          return res.status(404).send('Page not found');
        }
        res.status(500).send('Something broke!');
      });
  });

  app.get(`/${collectionPath}/:slug`, (req, res) => {
    fetcher
      .article(articles, req.params.slug, collection)
      .then(doc => res.send(doc))
      .catch(err => {
        console.log(err);
        if (err.message === '404') {
          return res.status(404).send('Article not found');
        }
        res.status(500).send('Something broke!');
      });
  });
});

app.get('/:page', (req, res) => {
  fetcher
    .page(pages, req.params.page)
    .then(doc => res.send(doc))
    .catch(err => {
      console.log(err);
      if (err.message === '404') {
        return res.status(404).send('Page not found');
      }
      res.status(500).send('Something broke!');
    });
});

exports.app = app;
