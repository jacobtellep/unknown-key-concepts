import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vdate = (value) => {
  // checks to make sure username is the right length, and alerts user if not followed
  if (value.length < 3 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter valid date.
      </div>
    );
  }
};

const vforeman = (value) => {
  // checks to make sure password is the right length, and alerts user if not followed
  if (value.length <= 0 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter a foreman name.
      </div>
    );
  }
};

const CreateForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [date, setDate] = useState('');
  const [foreman, setForeman] = useState('');
  const [jobDelay, setJobDelay] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  // below code sets the hook variables to the user inputs
  const onChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  const onChangeForeman = (e) => {
    const foreman = e.target.value;
    setForeman(foreman);
  };

  const onChangeJobDelay = (e) => {
    const jobDelay = e.target.value;
    setJobDelay(jobDelay);
  };

  const handleCreateForm = (e) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      // makes axios request to backend to insert data into database if no errors occurred in validation
      AuthService.getCreateForm(date, foreman, jobDelay).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
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

        <Form onSubmit={handleCreateForm} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <Input
                  type="text"
                  className="form-control"
                  name="date"
                  value={date}
                  onChange={onChangeDate}
                  validations={[required, vdate]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="foreman">Foreman</label>
                <Input
                  type="text"
                  className="form-control"
                  name="foreman"
                  value={foreman}
                  onChange={onChangeForeman}
                  validations={[required, vforeman]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="job-delay">Job Delay</label>
                <Input
                  type="text"
                  className="form-control"
                  name="job-delay"
                  value={jobDelay}
                  onChange={onChangeJobDelay}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Submit Form
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role="alert"
              >
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

export default CreateForm;
