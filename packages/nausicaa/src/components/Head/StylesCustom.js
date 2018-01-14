import React from 'react';

export default ({ styles }) =>
  <style amp-custom="">
    {styles + ' figure { margin: 0; }'}
  </style>;
