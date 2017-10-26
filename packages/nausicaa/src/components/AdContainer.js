import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  top: '-15vw',
  '@media screen and (min-width: 1024px)': {
    top: 0,
  },
});

const AdContainer = ({ adnetwork, adslot }) => (
  <Container>
    <amp-ad width={300} height={250} type={adnetwork} data-slot={adslot} />
  </Container>
);

AdContainer.propTypes = {
  adnetwork: PropTypes.string.isRequired,
  adslot: PropTypes.string.isRequired,
};
export default AdContainer;
