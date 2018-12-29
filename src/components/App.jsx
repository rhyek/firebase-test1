import React from 'react';
import Register from './Register';
import Login from './Login';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <Register />
        <h1>Login</h1>
        <Login />
      </div>
    );
  }
}
