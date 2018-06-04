const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const fetcher = require(functions.config().application.fetcher).default;
const Theme = require(functions.config().application.theme).default;

const plugins = functions
  .config()
  .application.plugins.map(plugin => require(plugin));
const theme = Theme(functions.config().application, plugins);

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

// TODO: make double digits work
const paginationRegex = ':page([2-9]|[1-9]\\d\\d*)';

app.get(`/(${paginationRegex})?`, (req, res) => {
  fetcher
    .start(articles, req.params.page || 1)
    .then(data => res.send(theme.start(data)))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

Object.keys(collections).forEach(collection => {
  const collectionPath = collections[collection].slug;

  app.get(`/${collectionPath}(/${paginationRegex})?`, (req, res) => {
    fetcher
      .portal(articles, collection, req.params.page || 1)
      .then(data => res.send(theme.portal(data)))
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
      .then(data => res.send(theme.article(data)))
      .catch(err => {
        console.log(err);
        if (err.message === '404') {
          return res.status(404).send('Page not found');
        }
        res.status(500).send('Something broke!');
      });
  });
});

app.get('/:page', (req, res) => {
  fetcher
    .page(pages, req.params.page)
    .then(data => res.send(theme.page(data)))
    .catch(err => {
      console.log(err);
      if (err.message === '404') {
        return res.status(404).send('Page not found');
      }
      res.status(500).send('Something broke!');
    });
});

exports.app = app;
