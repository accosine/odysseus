import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
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
  state = { articles: '' };

  componentDidMount() {
    const { firebase: { CONNECT, DATABASE, REFS, ACTIONS } } = this.props;
    CONNECT('articles', DATABASE, REFS, ACTIONS);
    // Add database change listener for each reference in the refs object
    this.props.firebase.REFS['articles'].on('value', snapshot => {
      this.setState({ articles: snapshot.val() });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.firebase.REFS['articles'].off();
  }

  render() {
    const classes = this.props.classes;

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
              {Object.keys(this.state.articles).map((key, index) => (
                <Paper key={key} className={classes.articlecard} elevation={4}>
                  <Link to={`/editor/${key}`}>
                    {this.state.articles[key].title}
                  </Link>
                </Paper>
              ))}
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
