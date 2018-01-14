import React from 'react';
import config from '../config';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import Portal from '../components/Portal';
import Pager from '../components/Portal/Pager';
import Listing from '../components/Portal/Listing';
import Footer from '../components/Footer';
import Start from '../components/Start';

import { startProps, portalProps } from './fixtures';

storiesOf('Start', module).add('Start', () => (
  <Start config={config} {...startProps} />
));

storiesOf('Footer', module).add('to Storybook', () => (
  <Footer config={config} />
));

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
