import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import withTheme from '../../util/withTheme';
import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import AdContainer from '../AdContainer';
import Articles from './Articles';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Roboto, sans-serif',
  '@media screen and (min-width: 1024px)': {
    alignItems: 'center',
  },
});

const Main = styled('main', {
  backgroundColor: '#f9fafb',
  marginTop: '23vw',
  '@media screen and (min-width: 1024px)': {
    width: '50vw',
    marginTop: '11vw',
  },
});

const CollectionA = withTheme(
  styled('a', ({ theme }) => ({
    '@media screen and (min-width: 1024px)': {},
  }))
);

const Start = ({ styletron, articles, config }) => (
  <Fragment>
    <Menu styletron={styletron} config={config} />
    <Analytics accountId={config.googleanalytics} />
    <Container>
      <SvgSpritemap styletron={styletron} />
      <Header styletron={styletron} />
      <Main id="main" role="main">
        <div>
          {articles.map(collectionArticles => (
            <Fragment key={collectionArticles.collection}>
              <CollectionA
                href={`/${config.collections[collectionArticles.collection]}`}
                class="category--headline category--headline--fernsehen"
              >
                {collectionArticles.collection}
              </CollectionA>
              <Articles
                articles={collectionArticles.articles}
                config={config}
              />
            </Fragment>
          ))}
        </div>
        <AdContainer
          adnetwork={config.ads.adnetwork}
          adslot={config.ads.adslot}
        />
      </Main>
      <aside />
      <Footer config={config} />
    </Container>
  </Fragment>
);

Start.propTypes = {
  config: PropTypes.object.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      collection: PropTypes.string.isRequired,
      articles: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default Start;
