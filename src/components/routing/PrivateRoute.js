import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

const PrivateRoute = ({
  isAuthenticated,
  loadUser,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute)
