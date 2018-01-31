import React from 'react';

export default ({ styles }) => (
  <style
    amp-custom=""
    dangerouslySetInnerHTML={{ __html: styles + ' figure { margin: 0; }' }}
  />
);
