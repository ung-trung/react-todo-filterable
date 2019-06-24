import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderTextInput from '../layouts/RenderTextInput';

const Login = () => {
  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Log In
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <form>
            <Field
              name="email"
              type="email"
              component={RenderTextInput}
              placeholder="Enter Email"
            />
            <Field
              name="password"
              type="password"
              component={RenderTextInput}
              placeholder="Enter Password"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect()(reduxForm({ form: 'login' })(Login));
