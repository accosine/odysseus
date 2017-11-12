import React, { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import marksy from 'marksy';
import Shortcodes from './util/shortcodes';
import Head from './components/Head';
import Publication from './components/Publication';
import ThemeProvider from './util/ThemeProvider';
import MarkdownComponents from './components/MarkdownComponents';
import getAmpScripts from './util/getAmpScripts';

import theme from './theme.js';

const compile = marksy({
  createElement,
  elements: MarkdownComponents,
});

const Layout = ({ styles, body, frontmatter, ampScripts, config }) => [
  <Head
    path={`${config.collections[frontmatter.collection]}/${frontmatter.slug}`}
    frontmatter={frontmatter}
    config={config}
    styles={styles}
    ampScripts={ampScripts}
  />,
  <body dangerouslySetInnerHTML={{ __html: body }} />,
];

export default config => {
  const shortcodes = Shortcodes(config);

  return (article, frontmatter) => {
    const styletron = new Styletron({ prefix: '_' });
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
          >
            {articleTree}
          </Publication>
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
};
