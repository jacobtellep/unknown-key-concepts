import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    // This function is for checking if a value has been entered by the user if it is a required field
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState(''); // hooks defined for username, password, loading, and message
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    // handles the username being changed in the username input field and sets username to the user input
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    // handles setting the password variable to the user input
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // prevents default action of form from happening

    setMessage('');
    setLoading(true);

    form.current.validateAll(); // calls validate all function from  react-validation to check all entered data

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        // calls login function from auth.service.js. Sends Axios request to backend endpoint.
        () => {
          props.history.push('/profile'); // if login is successful you are routed to profile page
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false); // sets loading to false to handle if the request is refused
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
