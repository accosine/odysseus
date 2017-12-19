import React from 'react';

export default ({
  pagination: { currentPage, pagerSize, articleCount },
  collection,
  config,
}) => (
  <div>
    {currentPage > 1 ? (
      <link
        rel="prev"
        href={`${config.protocol}://${config.domain}/${
          config.collections[collection]
        }${currentPage - 1 > 1 ? '/' + currentPage - 1 : ''}`}
      />
    ) : null}
    {currentPage < Math.ceil(articleCount / pagerSize) ? (
      <link
        rel="next"
        href={`${config.protocol}://${config.domain}/${
          config.collections[collection]
        }/${currentPage + 1}`}
      />
    ) : null}
  </div>
);
