/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const [active, setActive] = useState('');

  const burgerClick = () =>
    active === '' ? setActive('is-active') : setActive('');
  const closeBurgerAfterNavigate = () => (active === '' ? null : setActive(''));

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
            <Link
              className="navbar-item is-tab"
              to="/"
              onClick={closeBurgerAfterNavigate}>
              Home
            </Link>
            <div className="navbar-divider" />
            <Link
              className="navbar-item is-tab"
              to="/about"
              onClick={closeBurgerAfterNavigate}>
              About
            </Link>
          </div>
          <div className="navbar-item" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
