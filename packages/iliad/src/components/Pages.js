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
  pagescard: {
    width: '50vw',
  },
};

class Pages extends Component {
  state = { pages: [], loading: true };

  componentDidMount() {
    // TODO: use select() to get only slug and title
    this.firestoreUnsubscribe = this.props.firebase.firestore
      .collection('pages')
      .onSnapshot(snapshot => {
        this.setState({
          pages: snapshot.docs.map(page => page.data()),
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
    const { loading, pages } = this.state;

    return (
      <div>
        <Grid container className={classes.root}>
          <h2>Pages</h2>
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
                pages.map(({ slug, title }) => (
                  <Paper key={slug} className={classes.pagescard} elevation={4}>
                    <Link to={`/editor/page/${slug}`}>{title}</Link>
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

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(Pages));
