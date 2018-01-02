import React from 'react';
import PropTypes from 'prop-types';

const Pager = ({
  currentPage,
  pagerSize,
  articleCount,
  collection,
  config,
}) => (
  <div class="pagination--container">
    {currentPage === 1 ? (
      <span class="pagination--button pagination--button--inactive">
        |{'<'}
      </span>
    ) : (
      <a
        class="pagination--button pagination--button--active"
        href={'/' + config.collections[collection]}
      >
        |{'<'}
      </a>
    )}
    {currentPage > 1 ? (
      <a
        class="pagination--button pagination--button--active"
        href={`/${config.collections[collection]}${
          currentPage - 1 > 1 ? '/' + (currentPage - 1) : ''
        }`}
      >
        {'<'}
      </a>
    ) : (
      <span class="pagination--button pagination--button--inactive">{'<'}</span>
    )}
    {currentPage} von {Math.ceil(articleCount / pagerSize)}
    {currentPage < Math.ceil(articleCount / pagerSize) ? (
      <a
        class="pagination--button pagination--button--active"
        href={`/${config.collections[collection]}/${currentPage + 1}`}
      >
        {'>'}
      </a>
    ) : (
      <span class="pagination--button pagination--button--inactive">{'>'}</span>
    )}
    {currentPage === Math.ceil(articleCount / pagerSize) ? (
      <span class="pagination--button pagination--button--inactive">
        {'>'}|
      </span>
    ) : (
      <a
        class="pagination--button pagination--button--active"
        href={`/${config.collections[collection]}/${Math.ceil(
          articleCount / pagerSize
        )}`}
      >
        {'>'}|
      </a>
    )}
  </div>
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagerSize: PropTypes.number.isRequired,
  articleCount: PropTypes.number.isRequired,
};

export default Pager;
