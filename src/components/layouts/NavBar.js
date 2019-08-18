/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions'
import useDarkMode from 'use-dark-mode'

const NavBar = ({ isAuthenticated, logout }) => {
  const darkMode = useDarkMode(false)

  const [active, setActive] = useState('')
  const burgerClick = () =>
    active === '' ? setActive('is-active') : setActive('')

  return (
    <nav className="navbar is-danger is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item is-tab" href="/">
            <span style={{ fontFamily: 'Leckerli One', fontSize: '20px' }}>
              Trinh's Todo
            </span>
          </a>

          <a className={`navbar-burger burger ${active}`} onClick={burgerClick}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={`navbar-menu ${active}`}>
          <div className="navbar-start">
            <Link className="navbar-item is-tab" to="/" onClick={burgerClick}>
              Home
            </Link>
            <Link
              className="navbar-item is-tab"
              to="/about"
              onClick={burgerClick}>
              About
            </Link>
          </div>

          <div className="navbar-end">
            <div
              className="navbar-item is-tab"
              onClick={darkMode.toggle}
              style={{ cursor: 'pointer' }}>
              {darkMode.value ? '☀' : '☾'}
            </div>

            {isAuthenticated ? (
              <>
                <div
                  className="navbar-item is-tab"
                  onClick={() => {
                    burgerClick()
                    logout()
                  }}
                  style={{ cursor: 'pointer' }}>
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  className="navbar-item is-tab"
                  to="/login"
                  onClick={burgerClick}>
                  Sign In
                </Link>
                <Link
                  className="navbar-item is-tab"
                  to="/signup"
                  onClick={burgerClick}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { logout }
)(NavBar)
