const functions = require('firebase-functions');

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
          collection,
        }))
    )
  );

const page = (pages, slug) =>
  pages
    .doc(slug)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
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
        return article;
      } else {
        throw new Error('404');
      }
    });

const portal = (articles, collection, page) =>
  Promise.all([
    articles
      .select()
      .where('collection', '==', collection)
      .get()
      .then(emptySelectSnapshot => emptySelectSnapshot.docs.length),
    articles
      .select('slug', 'headline', 'subline', 'picture', 'attribution', 'alt')
      .orderBy('slug')
      .where('collection', '==', collection)
      .offset((page - 1) * pagerSize)
      .limit(parseInt(pagerSize, 10))
      .get(),
  ]).then(([articleCount, documentSnapshots]) => {
    if (!documentSnapshots.docs.length) {
      throw new Error('404');
    }
    return {
      articles: documentSnapshots.docs.map(article => article.data()),
      pagination: {
        collection,
        pagination: {
          currentPage: parseInt(page, 10),
          pagerSize,
          articleCount,
        },
      },
    };
  });

module.exports = {
  start,
  page,
  article,
  portal,
};
