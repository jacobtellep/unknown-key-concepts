import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';
import CreateForm from './CreateForm';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const history = useHistory();

  const handleClick = () => {
    history.push('/create-form');
  };

  // this module handles the profile page.
  // Displays the current users info.
  // Info displayed:
  // token
  // username
  // email
  // Id
  // User Role

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <button onClick={handleClick}>Create Form</button>
    </div>
  );
};

export default Profile;
