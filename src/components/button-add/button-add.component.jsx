import React from "react";

import "./button-add.styles.scss";

const ButtonAdd = props => (
  <a
    href="/"
    className="button-add"
    onClick={e => {
      e.preventDefault();
      props.onClick();
    }}
  >
    +
  </a>
);

export default ButtonAdd;
