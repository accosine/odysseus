import React from 'react';
import config from '../config';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import Portal from '../components/Portal';
import Pager from '../components/Portal/Pager';
import Listing from '../components/Portal/Listing';
import Footer from '../components/Footer';

storiesOf('Footer', module).add('to Storybook', () => (
  <Footer config={config} />
));
const portalProps = {
  articles: [
    {
      alt: 'Darum solltest Du Serien kaufen!',
      attribution: 'Stefan Schreier',
      headline: 'Raubkopierern gehört die digitale Hand abgehackt!',
      subline:
        'Darum solltest Du „Game Of Thrones“ & Co. kaufen statt illegal herunterzuladen!',
      slug: 'darum-solltest-du-game-of-thrones-kaufen',
      picture: 'darum-serien-kaufen.jpg',
    },
    {
      slug: 'findet-dorie-rezension',
      picture: 'mircoohl_findet_dorie.jpg',
      alt: 'you see nothing',
      attribution: '',
      headline: 'Rezension - Findet Dorie',
      subline: 'Frische Gedanken zum Film',
    },
    {
      slug: 'kritik-zu-tote-maedchen-luegen-nicht',
      picture: 'tote-maedchen-luegen-nicht-160417.jpg',
      alt: 'Kritik Tote Mädchen lügen nicht',
      attribution: 'unsplash.com / Xavier Sotomayor',
      headline: 'Kritik zu Tote Mädchen lügen nicht',
      subline:
        'Warum die Netflix-Serie schlecht und gleichzeitig großartig ist!',
    },
  ],
  frontmatter: {
    collection: 'Fernsehen',
    pagination: { currentPage: 1, pagerSize: 3, articleCount: 7 },
  },
};

storiesOf('Portal', module)
  .add('Portal', () => <Portal config={config} {...portalProps} />)
  .add('Pager', () => (
    <Pager
      currentPage={1}
      pagerSize={3}
      articleCount={7}
      collection="Fernsehen"
      config={config}
    />
  ))
  .add('Listing', () => <Listing config={config} {...portalProps} />);

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));
