/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const NavBar = ({ isAuthenticated, logout }) => {
  const [active, setActive] = useState('');
  const burgerClick = () =>
    active === '' ? setActive('is-active') : setActive('');

  return (
    <nav className="navbar is-danger is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item is-tab" href="/">
            <span className="icon is-medium">
              <i className="fas fa-list fa-lg" />
            </span>
            <span>Trinh's Todo</span>
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
            {isAuthenticated ? (
              <>
                <div
                  className="navbar-item is-tab"
                  onClick={() => {
                    burgerClick();
                    logout();
                  }}>
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
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
