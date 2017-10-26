import React from 'react';

export default ({ pagination, config }) => (
  <div>
    {pagination.previous.path ? (
      <link
        rel="prev"
        href={`${config.protocol}://${config.domain}/${pagination.previous
          .path}/`}
      />
    ) : null}
    {pagination.next.path ? (
      <link
        rel="next"
        href={`${config.protocol}://${config.domain}/${pagination.next.path}/`}
      />
    ) : null}
  </div>
);
