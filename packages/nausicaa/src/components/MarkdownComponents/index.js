import React from 'react';
import { styled } from 'styletron-react';
import withTheme from '../../util/withTheme';

const P = withTheme(
  styled('p', ({ context: { category }, theme }) => ({
    margin: '4vw 6vw 4vw 6vw',
    color: '#333',
    ':first-of-type:first-letter': {
      float: 'left',
      fontSize: '75px',
      lineHeight: '60px',
      paddingTop: '4px',
      paddingRight: '8px',
      paddingLeft: '3px',
      color: theme[category].color,
    },
    '@media screen and (min-width: 1024px)': {
      fontSize: '18px',
      lineHeight: '1.4',
    },
  }))
);

const H2 = withTheme(
  styled('h2', ({ theme }) => ({
    color: theme.mausgrau,
    margin: '5vw 6vw 2vw 6vw',
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
    },
  }))
);

const Block = withTheme(
  styled('blockquote', ({ category, theme }) => ({
    color: 'white',
    border: '3vw solid white',
    paddingTop: '4vw',
    margin: 0,
    padding: 0,
    backgroundImage: `linear-gradient(${theme.drehungverlauf}, ${theme[category]
      .verlauf})`,
    boxShadow: 'inset 0 0 30vw rgb(255, 255, 255)',
    '@media screen and (min-width: 1024px)': {
      border: '1vw solid #fff',
    },
  }))
);

const BlockP = withTheme(
  styled('p', ({ theme }) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.eierschale,
    fontSize: '8vw',
    paddingTop: '14vw',
    paddingBottom: '14vw',
    '::before': {
      fontSize: '47vw',
      position: 'absolute',
      content: 'open-quote',
      margin: '-52vw 0 0 0',
      left: '5vw',
    },
    '::after': {
      fontSize: '47vw',
      position: 'absolute',
      content: 'close-quote',
      margin: '4vw 0 0 0',
      right: '5vw',
    },
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
      paddingTop: '1vw',
      paddingBottom: '1vw',
      '::before': {
        fontSize: '12vw',
        margin: '-14vw 0 0 0',
        left: '3vw',
      },
      '::after': {
        fontSize: '12vw',
        margin: '1vw 0 0 0',
        right: '3vw',
      },
    },
  }))
);

const Blockquote = ({ context: { category }, children }) => (
  <Block category={category}>
    <BlockP>{children[1].props.children}</BlockP>
  </Block>
);

export default {
  p: P,
  h2: H2,
  blockquote: Blockquote,
};
