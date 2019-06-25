import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderTextInput from '../layouts/RenderTextInput';
import { registerUser, loadUser } from '../../actions';

const Register = ({
  handleSubmit,
  registerUser,
  loadUser,
  isAuthenticated,
  history
}) => {
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated, loadUser]);

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Sign Up
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <form
            onSubmit={handleSubmit(value => {
              const { firstName, lastName, username, email, password } = value;
              registerUser({ firstName, lastName, username, email, password });
            })}>
            <Field
              name="firstName"
              type="text"
              label="First Name:"
              component={RenderTextInput}
            />
            <Field
              name="lastName"
              type="text"
              label="Last Name:"
              component={RenderTextInput}
            />
            <Field
              name="username"
              type="text"
              label="Username:"
              component={RenderTextInput}
            />
            <Field
              name="email"
              type="email"
              label="Email:"
              component={RenderTextInput}
            />
            <Field
              label="Password:"
              name="password"
              type="password"
              component={RenderTextInput}
            />
            <Field
              label="Repeat Password:"
              name="rePassword"
              type="password"
              component={RenderTextInput}
            />
            <div className="control">
              <button className="button is-danger" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerUser, loadUser }
  // @ts-ignore
)(reduxForm({ form: 'login' })(Register));
