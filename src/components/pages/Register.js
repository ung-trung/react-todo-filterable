// @ts-nocheck
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadUser, clearError } from '../../actions'

import RegisterForm from '../auth/RegisterForm'
import BigHeartLoader from '../layouts/Loaders.js/BigHeartLoader'

const Register = ({
  loadUser,
  isAuthenticated,
  history,
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
    return <BigHeartLoader />
  }

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Register a new account
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <RegisterForm />
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerError: state.auth.error,
  isLoading: state.auth.isLoading
})

export default connect(
  mapStateToProps,
  { loadUser, clearError }
)(Register)
