const theme = require('../');
const { config, article1 } = require('./fixtures');

it('renders an article', () => {
  const html = theme(article1.text, article1.frontmatter, config);
  expect(html).toMatchSnapshot();
});
