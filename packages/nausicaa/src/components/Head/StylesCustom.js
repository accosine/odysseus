import React from 'react';

export default ({ styles }) => (
  <style
    amp-custom=""
    dangerouslySetInnerHTML={{
      __html:
        styles +
        ' .amp-carousel-slide img { object-fit: contain;} figure { margin: 0; }',
    }}
  />
);
