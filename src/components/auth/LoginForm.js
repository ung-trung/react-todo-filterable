// @ts-nocheck
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RenderTextInput from '../layouts/RenderTextInput'
import { login } from '../../actions'
import { Link } from 'react-router-dom'

const Login = ({ handleSubmit, login, loginError }) => {
  return (
    <form
      onSubmit={handleSubmit(value => {
        login(value)
      })}>
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
      {loginError && (
        <div className="field">
          <div className="control">
            <p className="help is-danger is-size-6">{loginError}</p>
          </div>
        </div>
      )}
      <div className="field">
        <div className="control">
          <button className="button is-danger is-fullwidth" type="submit">
            Login
          </button>
        </div>
      </div>

      <div className="field is-pulled-right">
        <div className="control">
          <Link className="is-link" to="/signup">
            Don't have an account? Sign up here
          </Link>
        </div>
      </div>
    </form>
  )
}

const validate = ({ email, password }) => {
  const errors = {}

  if (typeof password === 'string') {
    if (password.length < 6) {
      errors.password = 'Your password includes at least 6 characters!'
    }
  }

  if (!email) {
    errors.email = 'You must secify your email!'
  }

  if (!password) {
    errors.password = 'You must secify your password!'
  }

  return errors
}

const mapStateToProps = state => ({
  loginError: state.auth.error
})

export default connect(
  mapStateToProps,
  { login }
)(reduxForm({ form: 'login', validate })(Login))
