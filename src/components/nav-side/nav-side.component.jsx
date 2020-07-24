import React, {useState, useEffect} from "react";

import { Link } from "react-router-dom";

import MenuButton from "../button-menu/button-menu.component";

import "./nav-side.styles.scss";

const NavSide = ({toggle}) => {

  return (
    <nav className={`sidebar`}>
      <MenuButton onClick={toggle} />
    </nav>
  );
};

export default NavSide;
