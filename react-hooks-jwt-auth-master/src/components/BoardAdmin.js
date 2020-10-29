import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';

const BoardAdmin = () => {
  const [content, setContent] = useState(''); // hook to set the content of the content variable

  useEffect(() => {
    UserService.getAdminBoard().then(
      // userService function is imported using the UserService module
      (response) => {
        setContent(response.data); // setContent takes the response from the backend and sets the content variable to the responses data
      },
      (error) => {
        // anonymous function that takes error argument to handle an error coming from backend.
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    // here the JSX is defined for the BoardAdmin module
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardAdmin;
