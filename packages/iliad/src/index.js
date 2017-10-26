import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import 'typeface-roboto';
import App from './App';
import firebaseconfig from './config';
import './index.css';
import ThemeProvider from './util/ThemeProvider';
import FirebaseProvider from './util/FirebaseProvider';

firebase.initializeApp(firebaseconfig);
const REFS = {};
const ACTIONS = {};
const PROVIDER = new firebase.auth.FacebookAuthProvider();
const AUTH = firebase.auth();
const DATABASE = firebase.database();
const STORAGE = firebase.storage();
const CONNECT = (string, DATABASE, REFS, ACTIONS) => {
  REFS[string] = DATABASE.ref(`${string}/`);
  ACTIONS['push' + string] = data =>
    REFS[string].push(data, response => response);
};
const STORAGEKEY = 'KEY_FOR_LOCAL_STORAGE';

function isAuthenticated() {
  return !!AUTH.currentUser || !!localStorage.getItem(STORAGEKEY);
}

function Authenticate(event) {
  AUTH.signInWithRedirect(PROVIDER)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('Token: ' + token);
      // The signed-in user info.
      var user = result.user;
      console.log(user);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });
}

const firebaseApi = {
  ACTIONS,
  AUTH,
  Authenticate,
  CONNECT,
  DATABASE,
  REFS,
  isAuthenticated,
  STORAGE,
};

class Main extends Component {
  state = {
    open: false,
    user: {
      uid: '',
      team: '',
    },
  };

  componentDidMount() {
    AUTH.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // console.log(user);
        window.localStorage.setItem(STORAGEKEY, user.uid);
        this.setState({
          user: {
            uid: user.uid,
            avatar: user.photoURL,
            name: user.displayName,
          },
        });
      } else {
        // User is signed out.
        window.localStorage.removeItem(STORAGEKEY);
        this.setState({ user: { uid: null } });
      }
    });
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => this.setState({ open: false });

  render() {
    return (
      <ThemeProvider>
        <FirebaseProvider firebase={firebaseApi}>
          <App
            {...this.state}
            onDrawerToggle={this.handleDrawerToggle}
            onDrawerClose={this.handleDrawerClose}
          />
        </FirebaseProvider>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
