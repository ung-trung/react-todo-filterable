// @ts-nocheck
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RenderTextInput from '../layouts/RenderTextInput'
import { login, loadUser, clearError } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const Login = ({
  handleSubmit,
  login,
  loadUser,
  isAuthenticated,
  history,
  loginError,
  clearError,
  isLoading
}) => {
  useEffect(() => {
    loadUser()
    clearError()
    if (isAuthenticated) {
      history.push('/')
    }
  }, [clearError, history, isAuthenticated, loadUser])

  if (isLoading) {
    return (
      <section className="section">
        <div className="columns is-mobile is-multiline is-centered">
          <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
            <div style={{ textAlign: 'center' }}>
              <Loader
                type="Hearts"
                color="hsl(348, 100%, 61%)"
                height={240}
                width={240}
                visible={isLoading}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Login
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
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
        </div>
      </div>
    </section>
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
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.error,
  isLoading: state.auth.isLoading
})

export default connect(
  mapStateToProps,
  { login, loadUser, clearError }
  // @ts-ignore
)(reduxForm({ form: 'login', validate })(Login))
