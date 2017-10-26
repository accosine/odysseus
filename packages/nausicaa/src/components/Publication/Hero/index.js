import React from 'react';
import AmpComponent from '../../AmpComponent';
import { styled } from 'styletron-react';
import withTheme from '../../../util/withTheme';
import formatDate from '../../../util/formatDate';
import addSizeSuffix from '../../../util/addSizeSuffix';
import { oneLine } from 'common-tags';
const AmpImg = AmpComponent('amp-img');

const Picture = styled('figcaption', {
  position: 'relative',
});

const PictureAttribution = styled('figcaption', {
  color: 'aliceblue',
  fontSize: '2.5vw',
  margin: '3vw 5vw',
  position: 'absolute',
  right: '1vw',
  textShadow: '1px 1px black',
  top: 0,
  '@media screen and (min-width: 1024px)': {
    fontSize: '10px',
    margin: '1vw 0vw',
  },
});

const Container = styled('div', {
  margin: '0 auto',
  padding: '10px',
  width: '87vw',
  position: 'relative',
  top: '-15vw',
  background: 'white',
  lineHeight: 1,
  '@media screen and (min-width: 1024px)': {
    top: 0,
    width: 'inherit',
  },
});

const Time = withTheme(
  styled('time', ({ theme }) => ({
    display: 'block',
    margin: '0vw 0vw 5vw 0vw',
    color: theme.mausgrau,
    '@media screen and (min-width: 1024px)': {
      margin: '0 0 2vw 0',
    },
  }))
);

const Breadcrumbs = withTheme(
  styled('p', ({ theme, category }) => ({
    marginBottom: '5vw',
    color: theme[category].color,
    '@media screen and (min-width: 1024px)': {
      marginBottom: '2vw',
    },
  }))
);

const A = withTheme(
  styled('a', ({ theme, category }) => ({
    color: theme[category].color,
  }))
);

const Author = styled('div', {
  paddingTop: '4vw',
  height: '25vw',
  width: '25vw',
  margin: '0 auto',
  '@media screen and (min-width: 1024px)': {
    width: '10vw',
    height: '10vw',
  },
});

const AuthorName = styled('span', {
  display: 'block',
  fontSize: '3vw',
  textAlign: 'center',
  marginTop: '2vw',
  '@media screen and (min-width: 1024px)': {
    fontSize: '1vw',
  },
});

const AuthorPicture = withTheme(
  styled(AmpComponent('amp-img'), ({ theme }) => ({
    boxShadow: `0px 2px 7px 0px ${theme.mausgrau}`,
    borderRadius: '100%',
  }))
);

const Headline = withTheme(
  styled('h1', ({ theme }) => ({
    marginBottom: '5vw',
    color: theme.mausgrau,
    '@media screen and (min-width: 1024px)': {
      fontSize: '5vw',
    },
  }))
);

const Subline = withTheme(
  styled('h2', ({ theme, category }) => ({
    backgroundColor: theme[category].subline,
    fontSize: '5vw',
    color: 'white',
    padding: '2vw',
    margin: '0 0 3vw 0',
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
      padding: '1vw',
    },
  }))
);

export default ({
  config,
  picture,
  category,
  date,
  headline,
  subline,
  attribution,
  author,
  alt,
}) => [
  <Picture>
    <AmpImg
      width={4}
      height={3}
      src={`${config.media}${picture}${config.images.small
        .suffix}${config.mediasuffix}`}
      srcset={oneLine`${config.media}${addSizeSuffix(
        picture,
        config.images.large.suffix
      )}${config.mediasuffix} ${config.images.large.size},
                  ${config.media}${addSizeSuffix(
        picture,
        config.images.medium.suffix
      )}${config.mediasuffix} ${config.images.medium.size},
                  ${config.media}${addSizeSuffix(
        picture,
        config.images.medium.suffix
      )}${config.mediasuffix} ${config.images.small.size}`}
      alt={alt}
      attribution={attribution}
      layout="responsive"
    />
    <PictureAttribution>{attribution}</PictureAttribution>
  </Picture>,
  <Container>
    <Breadcrumbs category={category}>
      <A category={category} href="/">
        Start
      </A>
      {' > '}
      <A category={category} href={`/${config.categories[category]}/`}>
        {category}
      </A>
    </Breadcrumbs>
    <Time dateTime={formatDate(date, 'YYYY-MM-DD', 'en')}>
      {formatDate(date, 'DD. MMMM YYYY', 'de')}
    </Time>
    <Headline>{headline}</Headline>
    <Subline category={category}>{subline}</Subline>
    <Author>
      <AuthorPicture
        width={4}
        height={4}
        src={`${config.media}${config.authors[author]
          .avatar}${config.mediasuffix}`}
        alt={alt}
        attribution={attribution}
        layout="responsive"
      />
    </Author>
    <AuthorName>{config.authors[author].name}</AuthorName>
  </Container>,
];
