const functions = require('firebase-functions');
const Theme = require(functions.config().application.theme).default;

const theme = Theme(functions.config().application);
const pagerSize = functions.config().application.pager.size;
const collectionsorder = functions.config().application.article
  .collectionsorder;

const start = (articles, page) =>
  Promise.all(
    collectionsorder.map(collection =>
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
  ).then(articles => theme.start(articles));

const page = (pages, slug) =>
  pages
    .doc(slug)
    .get()
    .then(doc => {
      if (doc.exists) {
        const page = doc.data();
        return theme.page(page.content, page);
      } else {
        throw new Error('404');
      }
    });

const article = (articles, slug, collection) =>
  articles
    .doc(slug)
    .get()
    .then(doc => {
      if (doc.exists) {
        const article = doc.data();
        if (article.collection !== collection) {
          throw new Error('404');
        }
        return theme.article(article.content, article);
      } else {
        throw new Error('404');
      }
    });

const portal = (articles, collection, page) =>
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
          return theme.portal(articles, {
            collection: collection,
            pagination: {
              currentPage: parseInt(page, 10),
              pagerSize,
              articleCount: emptySelectSnapshot.docs.length,
            },
          });
        })
    );

module.exports = {
  start,
  page,
  article,
  portal,
};
