import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';

import withTheme from '../../util/withTheme';
import AmpComponent from '../AmpComponent';
import addSizeSuffix from '../../util/addSizeSuffix';
const AmpImg = AmpComponent('amp-img');

const Article = withTheme(
  styled('div', ({ theme }) => ({
    '@media screen and (min-width: 1024px)': {},
  }))
);

const Headline = withTheme(
  styled('h1', ({ theme }) => ({
    '@media screen and (min-width: 1024px)': {},
  }))
);

const Figcaption = withTheme(
  styled('figcaption', ({ theme }) => ({
    '@media screen and (min-width: 1024px)': {},
  }))
);

const Figure = styled('figure', {
  margin: 0, // REMINDER: Add to CSS reset
});

const Articles = ({ articles, collection, config }) => (
  <div class="category--container">
    {articles.map(({ picture, attribution, alt, slug, headline, subline }) => (
      <section key={slug}>
        <a href={`/${config.collections[collection]}/${slug}`}>
          {/* <div class="article--container article--container--{{tolowercase this.collection.[0]}}"> */}
          <Article>
            <Figure>
              <AmpImg
                width={4}
                height={3}
                src={oneLine`${config.media}${addSizeSuffix(
                  picture,
                  config.images.medium.suffix
                )}${config.mediasuffix}`}
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
              {/* <amp-img class="article--cover{{#if @first}} first-art{{/if}}" */}
              {/* <h1 class="article--headline">{headline}</h1> */}
              <Headline>{headline}</Headline>
              {/* <figcaption class="article--teaser--caption"> */}
              <Figcaption>{attribution}</Figcaption>
            </Figure>
          </Article>
        </a>
      </section>
    ))}
  </div>
);

Articles.defaultProps = {};

Articles.propTypes = {};

export default Articles;
