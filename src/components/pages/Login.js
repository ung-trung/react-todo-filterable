// @ts-nocheck
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadUser, clearError } from '../../actions'
import LoginForm from '../auth/LoginForm'
import BigHeartLoader from '../layouts/Loaders/BigHeartLoader'

const Login = ({
  loadUser,
  isAuthenticated,
  clearError,
  isLoading,
  location
}) => {
  useEffect(() => {
    loadUser()
    clearError()
  }, [clearError, loadUser])

  if (isAuthenticated) {
    loadUser()
    clearError()
    const { from } = location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <BigHeartLoader />
      </div>
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
          <LoginForm />
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.error,
  isLoading: state.auth.isLoading
})

export default connect(
  mapStateToProps,
  { loadUser, clearError }
)(Login)
