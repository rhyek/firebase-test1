import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { email, password, baseURL } from '../consts';

export default class Register extends React.Component {
  recaptchaRef = React.createRef();

  state = {
    recaptchaResponseToken: null,
  };

  handleRecaptchaChange = value => {
    this.setState({
      recaptchaResponseToken: value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { recaptchaResponseToken } = this.state;
    try {
      await axios.post(`${baseURL}/user/register`, {
        email,
        password,
        recaptchaResponseToken,
      });
      alert('Success!');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 'auth/email-already-exists'
      ) {
        return;
      } else {
        alert(error);
      }
    } finally {
      this.recaptchaRef.current.reset();
    }
  };

  render() {
    const { recaptchaResponseToken } = this.state;

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
        <ReCAPTCHA
          ref={this.recaptchaRef}
          sitekey="6Ldis30UAAAAACX_QujWx_10lZcwWfVhhQOg01SI"
          onChange={this.handleRecaptchaChange}
        />
        <button type="submit" disabled={!recaptchaResponseToken}>
          Register
        </button>
      </form>
    );
  }
}
