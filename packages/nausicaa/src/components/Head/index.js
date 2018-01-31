import React from 'react';

import HeadPagination from './HeadPagination';
import SocialmediaMeta from './SocialmediaMeta';
import Schema from './Schema';
import SchemaSitename from './SchemaSitename';
import Font from './Font';
import StylesAmp from './StylesAmp';
import StylesCustom from './StylesCustom';
import Favicons from './Favicons';
import AmpScript from '../AmpScript';

import formatDate from '../../util/formatDate';

const Head = ({
  frontmatter,
  frontmatter: {
    title,
    date,
    collection,
    attribution,
    author,
    picture,
    alt,
    headline,
    subline,
    layout,
    lightbox,
    description,
    slug,
    pagination,
  },
  styles,
  body,
  config,
  path,
  ampScripts,
}) => (
  <head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <title>{title || collection}</title>
    {layout === 'start' ? (
      <link rel="canonical" href={`${config.protocol}://${config.domain}`} />
    ) : null}
    {layout === 'publication' ? (
      <link
        rel="canonical"
        href={`${config.protocol}://${config.domain}/${config.collections[
          collection
        ]}/${slug}`}
      />
    ) : null}
    {layout === 'portal' ? (
      <link
        rel="canonical"
        href={`${config.protocol}://${config.domain}/${config.collections[
          collection
        ]}${pagination.currentPage > 1 ? '/' + pagination.currentPage : ''}`}
      />
    ) : null}
    {layout === 'portal' ? (
      <HeadPagination
        pagination={pagination}
        collection={collection}
        config={config}
      />
    ) : null}
    {layout === 'basic' ? (
      <link
        rel="canonical"
        href={`${config.protocol}://${config.domain}/${path}`}
      />
    ) : null}
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0"
    />
    <meta name="author" content={config.organization.name} />
    <meta name="copyright" content={config.organization.name} />
    <meta name="email" content={config.organization.email} />
    <meta name="date" content={formatDate(date, 'YYYY-MM-DD', 'de')} />
    <meta name="last-modified" content={formatDate(date, 'YYYY-MM-DD', 'de')} />
    <meta name="description" content={description} />
    <SocialmediaMeta
      path={path}
      config={config}
      frontmatter={{ title, picture, layout, description }}
    />
    {layout === 'publicatin' ? (
      <Schema {...frontmatter} config={config} />
    ) : null}
    <SchemaSitename config={config} />
    <Font />
    <Favicons config={config} />
    <meta property="fb:pages" content={config.fbpageid} />
    <AmpScript name="analytics" />
    <script async src="https://cdn.ampproject.org/v0.js" />
    <AmpScript name="ad" />
    <AmpScript name="user-notification" />
    <AmpScript name="sidebar" />
    {ampScripts.map((name, index) => <AmpScript key={index} name={name} />)}
    <StylesAmp />
    <StylesCustom styles={styles} />
  </head>
);

Head.defaultProps = {
  ampScripts: [],
};

export default Head;
