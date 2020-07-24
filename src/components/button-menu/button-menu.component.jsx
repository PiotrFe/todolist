import React from "react";
import "./button-menu.styles.scss";

const MenuButton = ({onClick}) => (
  <label class="menu-button">
    <input type="checkbox" id="check" class="menu-button__checkbox" onClick={() => onClick()} />
    <span class="menu-button__icon">&nbsp;</span>
  </label>
);

export default MenuButton;
