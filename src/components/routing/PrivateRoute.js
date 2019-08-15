import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { loadUser } from '../../actions'
import { connect } from 'react-redux'

const PrivateRoute = ({
  isAuthenticated,
  loadUser,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { loadUser }
)(PrivateRoute)
