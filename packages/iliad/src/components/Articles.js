import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import FixedButton from './FixedButton';
import ArticleCard from './ArticleCard';
import CreateIcon from 'material-ui-icons/Create';
import connectFirebase from '../util/connect-firebase';

const styleSheet = theme => ({
  root: {
    marginTop: 2 * theme.spacing.unit,
  },
});

class Articles extends Component {
  state = { articles: [], loading: true };

  componentDidMount() {
    // TODO: use select() to get only slug and title
    this.firestoreUnsubscribe = this.props.firebase.firestore
      .collection('articles')
      // .select('slug', 'title', 'headline', 'description', 'picture')
      .onSnapshot(snapshot => {
        this.setState({
          articles: snapshot.docs.map(article => article.data()),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    // Remove database change listener
    this.firestoreUnsubscribe();
  }

  render() {
    const { classes, history } = this.props;
    const { loading, articles } = this.state;

    return (
      <Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              align={'center'}
              container
              direction={'column'}
              justify={'center'}
              spacing={16}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                articles.map(({ slug, ...props }) => (
                  <ArticleCard
                    key={slug}
                    onClick={() => history.push(`/editor/article/${slug}`)}
                    {...props}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
        <FixedButton component={Link} to="/editor/article" position="right">
          <CreateIcon />
        </FixedButton>
      </Fragment>
    );
  }
}

Articles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(Articles));
