import React from "react";

import "./button-toggle.styles.scss";

const ButtonToggle = () => (
<div className="switch">
  <label class="switch__label">
    <input type="checkbox" class="switch__checkbox"></input>
    <span class="switch__slider--round"></span>
  </label>
  </div>
);

export default ButtonToggle;
