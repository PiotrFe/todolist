import React from "react";

import { Link } from "react-router-dom";

import "./nav-side.styles.scss";

const NavSide = () => (
  <nav className="sidebar">
    <ul className="side-nav">
      <li className="side-nav__item">
        <Link to="/" className="side-nav__link">
          Home
        </Link>
      </li>
      <li className="side-nav__item">
        <Link to="/user" className="side-nav__link">
          My lists
        </Link>
      </li>
      <li className="side-nav__item">
        <Link to="/templates" className="side-nav__link">
          My templates
        </Link>
      </li>
      <li className="side-nav__item">
        <Link to="/logout" className="side-nav__link">
            Log out
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavSide;
