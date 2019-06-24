import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderTextInput from '../layouts/RenderTextInput';

const Register = ({ handleSubmit }) => {
  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Sign Up
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <form onSubmit={handleSubmit(value => console.log(value))}>
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

            <button className="button is-danger" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect()(reduxForm({ form: 'login' })(Register));
