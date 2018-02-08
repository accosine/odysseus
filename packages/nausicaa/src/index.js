import React, { createElement, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import marksy from 'marksy';
import Shortcodes from './util/shortcodes';
import Head from './components/Head';
import Publication from './components/Publication';
import Portal from './components/Portal';
import Start from './components/Start';
import ThemeProvider from './util/ThemeProvider';
import MarkdownComponents from './components/MarkdownComponents';
import getAmpScripts from './util/getAmpScripts';

import theme from './theme.js';

const initializeStyletron = () => {
  // begin incrementing classnames from 'ae' forward
  const styletron = new Styletron();
  styletron.msb = 1295;
  styletron.power = 2;
  styletron.offset = 374;
  return styletron;
};

const compile = marksy({
  createElement,
  elements: MarkdownComponents,
});

const Layout = ({ styles, body, frontmatter, ampScripts, config }) => {
  console.log(frontmatter.collection);
  return (
    <Fragment>
      <Head
        frontmatter={frontmatter}
        config={config}
        styles={styles}
        ampScripts={ampScripts}
      />
      <body dangerouslySetInnerHTML={{ __html: body }} />
    </Fragment>
  );
};

const article = config => (article, frontmatter) => {
  const shortcodes = Shortcodes(config);

  const styletron = initializeStyletron();
  const { text, usedShortcodes } = shortcodes(article, styletron);
  const { tree: articleTree } = compile(
    text,
    { sanitize: false },
    { collection: frontmatter.collection }
  );

  const ampScripts = getAmpScripts(usedShortcodes);

  const appMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Publication
          styletron={styletron}
          frontmatter={frontmatter}
          config={config}
          article={articleTree}
        />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={styletron.getCss()}
        body={appMarkup}
        ampScripts={ampScripts}
      />
    ) +
    '</html>';

  return html;
};

const portal = config => (articles, frontmatter) => {
  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Portal
          styletron={styletron}
          frontmatter={frontmatter}
          articles={articles}
          config={config}
        />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={{ layout: 'portal', ...frontmatter }}
        config={config}
        styles={styletron.getCss()}
        body={body}
      />
    ) +
    '</html>';

  return html;
};

const start = config => articles => {
  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Start styletron={styletron} articles={articles} config={config} />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={{ layout: 'start', title: config.organization.altname }}
        config={config}
        styles={styletron.getCss()}
        body={body}
      />
    ) +
    '</html>';

  return html;
};

export default config => ({
  article: article(config),
  portal: portal(config),
  start: start(config),
});
