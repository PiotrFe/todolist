import React from "react";
import "./button-menu.styles.scss";

const MenuButton = ({onClick}) => (
  <label className="menu-button">
    <input type="checkbox" id="check" className="menu-button__checkbox" onClick={() => onClick()} />
    <span className="menu-button__icon">&nbsp;</span>
  </label>
);

export default MenuButton;
