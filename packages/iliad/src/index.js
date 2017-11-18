import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'typeface-roboto';
import App from './App';
import firebaseconfig from './config';
import './index.css';
import ThemeProvider from './util/ThemeProvider';
import FirebaseProvider from './util/FirebaseProvider';


firebase.initializeApp(firebaseconfig);
const PROVIDER = new firebase.auth.FacebookAuthProvider();
const AUTH = firebase.auth();

const STORAGEKEY = 'KEY_FOR_LOCAL_STORAGE';

function isAuthenticated() {
  return !!AUTH.currentUser || !!localStorage.getItem(STORAGEKEY);
}

function Authenticate(event) {
  AUTH.signInWithRedirect(PROVIDER)
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      console.log('Token: ' + token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      // Handle Errors here.
      console.log(error);
      // ...
    });
}

const firebaseApi = {
  AUTH,
  Authenticate,
  firestore: firebase.firestore(),
  isAuthenticated,
  STORAGE: firebase.storage(),
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
