import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import connectFirebase from '../util/connect-firebase';

const styleSheet = {
  demo: {
    flexDirection: 'column',
  },
  articlecard: {
    width: '50vw',
  },
};

class Articles extends Component {
  state = { articles: [], loading: true };

  componentDidMount() {
    this.firestoreUnsubscribe = this.props.firebase.firestore
      .collection('articles')
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
    const { classes } = this.props;
    const { loading, articles } = this.state;

    return (
      <div>
        <Grid container className={classes.root}>
          <h2>Articles</h2>
          <Grid item xs={12}>
            <Grid
              align={'center'}
              container
              className={classes.demo}
              direction={'column'}
              justify={'center'}
              spacing={16}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                articles.map(({ slug, title }) => (
                  <Paper
                    key={slug}
                    className={classes.articlecard}
                    elevation={4}
                  >
                    <Link to={`/editor/${slug}`}>{title}</Link>
                  </Paper>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Articles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(Articles));
