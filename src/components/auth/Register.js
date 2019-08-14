import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import RenderTextInput from '../layouts/RenderTextInput'
import { registerUser, loadUser, clearError } from '../../actions'

const Register = ({
  handleSubmit,
  registerUser,
  loadUser,
  isAuthenticated,
  history,
  registerError,
  clearError
}) => {
  useEffect(() => {
    loadUser()
    clearError()
    if (isAuthenticated) {
      history.push('/')
    }
  }, [clearError, history, isAuthenticated, loadUser])

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Register a new account
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <form
            onSubmit={handleSubmit(value => {
              const { firstName, lastName, username, email, password } = value
              registerUser({ firstName, lastName, username, email, password })
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
            {registerError && (
              <div className="field">
                <div className="control">
                  <p className="help is-danger is-size-6">{registerError}</p>
                </div>
              </div>
            )}
            <div className="field">
              <div className="control">
                <button className="button is-danger is-fullwidth" type="submit">
                  Register
                </button>
              </div>
            </div>
            <div className="field is-pulled-right">
              <div className="control">
                <Link className="is-link" to="/login">
                  Already have an account? Sign in here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

const validate = ({
  firstName,
  lastName,
  username,
  email,
  password,
  rePassword
}) => {
  const errors = {}

  if (password !== rePassword) {
    errors.rePassword = 'Please check your password!'
  }
  if (typeof password === 'string') {
    if (password.length < 6) {
      errors.password = 'Your password includes at least 6 characters!'
    }
  }

  if (!firstName) {
    errors.firstName = 'You must enter your first name!'
  }

  if (!lastName) {
    errors.lastName = 'You must enter a your last name!'
  }

  if (!username) {
    errors.username = 'You must specify a username!'
  }

  if (!email) {
    errors.email = 'You must secify your email!'
  }

  return errors
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerError: state.auth.error
})

export default connect(
  mapStateToProps,
  { registerUser, loadUser, clearError }
  // @ts-ignore
)(reduxForm({ form: 'login', validate })(Register))
