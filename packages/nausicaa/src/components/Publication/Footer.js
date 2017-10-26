import React from 'react';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';

const LogoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Logo = styled('div', {
  margin: '10vw auto 0 auto',
  width: '26vw',
  padding: '2vw 0 2vw 1vw',
  '@media screen and (min-width: 1024px)': {
    width: '10vw',
    height: 'inherit',
  },
});

const LogoText = styled('svg', {
  margin: '0 auto',
  height: '26vw',
  padding: '0 0 2vw 1vw',
  width: '54vw',
  display: 'block',
  '@media screen and (min-width: 1024px)': {
    width: '22vw',
    height: 'inherit',
  },
});

const Ul = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  height: '40vw',
  listStyleType: 'none',
  padding: '5vw',
  '@media screen and (min-width: 1024px)': {
    height: 'inherit',
    flexDirection: 'row',
    width: '50vw',
    justifyContent: 'space-between',
    padding: '5vw 0 5vw 0',
  },
});

const Li = styled('li', {
  paddingBottom: '3vw',
});

const A = styled('a', {
  textDecoration: 'none',
  color: '#585252',
});

export default ({ config }) => [
  <footer>
    <LogoContainer>
      <a href="#main">
        <Logo>
          <amp-img
            width={'3'}
            height={'3'}
            src={`${config.media}nausika-gurl.min.svg${config.mediasuffix}`}
            alt="Gurl you know it's true, uh uh uh, I love you!"
            attribution="All Rights Reserved"
            layout="responsive"
          />
        </Logo>
      </a>
      <a href="#main">
        <LogoText>
          <use xlinkHref="#nausika--logotext-use" />
        </LogoText>
      </a>
    </LogoContainer>
    <Ul>
      {/* TODO */}
      {/* <Li>Newsletter</Li> */}
      {/* <Li>Über uns</Li> */}
      {/* <Li>FAQ</Li> */}
      {/* <Li>Werbung</Li> */}
      <Li>
        <A href="/impressum/">Impressum</A>
      </Li>
      <Li>
        <A href="/datenschutz/">Datenschutz</A>
      </Li>
      <Li>
        <A href="/agb/">AGB</A>
      </Li>
      <Li>
        <A href="/rss/">RSS</A>
      </Li>
      <Li>
        <A href={`https://www.facebook.com/${config.vanityurl}`}>Facebook</A>
      </Li>
      <Li>
        <A href={`https://www.twitter.com/${config.vanityurl}`}>Twitter</A>
      </Li>
    </Ul>
  </footer>,
  <amp-user-notification
    layout="nodisplay"
    id="amp-user-notification1"
    dangerouslySetInnerHTML={{
      __html: oneLine`
    nausika nutzt Cookies in deinem Browser. Wir speichern darin allerlei Daten
    - aber keine Sorge, nichts Wildes. Mehr langweiLiges bla bla über Cookies
    kannst du <a href="/datenschutz/">hier lesen...</a>
    <button on="tap:amp-user-notification1.dismiss">
      Cookies finde ich ganz ok
    </button>
      `,
    }}
  />,
];
