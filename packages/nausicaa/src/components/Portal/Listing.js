import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';

import AmpComponent from '../AmpComponent';
import addSizeSuffix from '../../util/addSizeSuffix';
const AmpImg = AmpComponent('amp-img');

const Listing = ({ articles, collection, config }) => (
  <Fragment>
    <h1 class="category--headline category--headline--{{tolowercase category}}">
      {collection}
    </h1>
    <div class="category--container">
      {articles.map(
        ({ picture, attribution, alt, slug, headline, subline }) => (
          <section key={slug}>
            <a href={`/${collection}/${slug}`}>
              <div class="article--container article--container--{{tolowercase ../category}}">
                <figure>
                  <AmpImg
                    class="article--cover{{#if @first}} first-art{{/if}}"
                    width={4}
                    height={3}
                    src={`${config.media}${picture}${
                      config.images.small.suffix
                    }${config.mediasuffix}`}
                    srcset={oneLine`${config.media}${addSizeSuffix(
                      picture,
                      config.images.medium.suffix
                    )}${config.mediasuffix} ${config.images.medium.size},
                  ${config.media}${addSizeSuffix(
                      picture,
                      config.images.small.suffix
                    )}${config.mediasuffix} ${config.images.small.size}`}
                    alt={alt}
                    attribution={attribution}
                    layout="responsive"
                  />
                  <figcaption class="article--teaser--caption">
                    {attribution}
                  </figcaption>
                </figure>
                <h2 class="article--headline">{headline}</h2>
                <h3 class="article--subline">{subline}</h3>
              </div>
            </a>
          </section>
        )
      )}
    </div>
  </Fragment>
);

Listing.defaultProps = {};

Listing.propTypes = {};

export default Listing;
