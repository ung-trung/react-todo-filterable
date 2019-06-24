/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
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
            <div className="navbar-item" onClick={burgerClick}>
              <div className="buttons">
                <Link to="/signup" className="button is-light">
                  Sign up
                </Link>
                <Link to="/login" className="button is-light">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
