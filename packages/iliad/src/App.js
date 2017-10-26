import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SplitScreen from './components/SplitScreen';
import Articles from './components/Articles';
import Navigation from './components/Navigation';
import Dresser from './components/Dresser';
import connectFirebase from './util/connect-firebase';
import yellow from 'material-ui/colors/yellow';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const styleSheet = {
  app: {
    width: '100%',
    height: 'fit-content',
    minHeight: '100vh',
    background: yellow[50],
    display: 'flex',
    flexDirection: 'column',
  },
};

const RenderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ component, redirectTo, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={routeProps =>
      isAuthenticated() ? (
        RenderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: routeProps.location },
          }}
        />
      )}
  />
);

class App extends Component {
  render() {
    const {
      classes,
      firebase,
      user,
      open,
      onDrawerToggle,
      onDrawerClose,
    } = this.props;
    return (
      <Router basename="/admin">
        <div className={classes.app}>
          <Navigation onDrawerToggle={onDrawerToggle} user={user} />
          <Dresser
            onDrawerClose={onDrawerClose}
            isAuthenticated={firebase.isAuthenticated}
            open={open}
          />
          <PrivateRoute
            exact
            path="/editor"
            isAuthenticated={firebase.isAuthenticated}
            component={SplitScreen}
            redirectTo="/"
          />
          <PrivateRoute
            path="/editor/:slug"
            isAuthenticated={firebase.isAuthenticated}
            component={SplitScreen}
            redirectTo="/"
          />
          <PrivateRoute
            path="/articles"
            isAuthenticated={firebase.isAuthenticated}
            component={Articles}
            redirectTo="/"
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    ACTIONS: PropTypes.object.isRequired,
    AUTH: PropTypes.object.isRequired,
    Authenticate: PropTypes.func.isRequired,
    CONNECT: PropTypes.func.isRequired,
    DATABASE: PropTypes.object.isRequired,
    REFS: PropTypes.object.isRequired,
    STORAGE: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styleSheet)(connectFirebase(App));
