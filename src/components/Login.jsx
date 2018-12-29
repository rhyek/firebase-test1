import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { email, password, baseURL } from '../consts';

const config = {
  apiKey: 'AIzaSyCYFET0mmDwNahyHKfdgKsUkgLus9yLGqQ',
  authDomain: 'test1-19ab7.firebaseapp.com',
  databaseURL: 'https://test1-19ab7.firebaseio.com',
  projectId: 'test1-19ab7',
  storageBucket: 'test1-19ab7.appspot.com',
  messagingSenderId: '830827029264',
};

const app = firebase.initializeApp(config);

export default class Login extends React.Component {
  state = {
    loading: true,
    user: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      this.setState({ loading: false, user });
    });
  }

  handleSignOut = async () => {
    await firebase.auth().signOut();
    this.setState({ user: null });
    console.log('logged out :(');
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      data: { customToken },
    } = await axios.post(`${baseURL}/user/login`, {
      email,
      password,
    });
    await app.auth().signInWithCustomToken(customToken);
    console.log('logged in :)');
  };

  render() {
    const { loading, user } = this.state;

    if (loading) {
      return <div>loading...</div>;
    } else if (user) {
      return (
        <>
          <div>user: {user.email}</div>
          <button type="button" onClick={this.handleSignOut}>
            Sign out
          </button>
        </>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>email</label>
            <div>
              <input type="email" name="email" value={email} readOnly />
            </div>
          </div>
          <div>
            <label>password</label>
            <div>
              <input type="password" name="password" value={password} readOnly />
            </div>
          </div>
          <button type="submit">Log in</button>
        </form>
      );
    }
  }
}
