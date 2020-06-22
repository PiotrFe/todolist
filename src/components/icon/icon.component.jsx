import React from "react";

import { IconClasses } from "./icon.types";

import "./icon.styles.scss";

const Icon = ({type, id, parent, size, handleClick}) => (
  <i
    className={`icon icon--${size} ${parent}__icon ${IconClasses[type]}`}
    onClick={() => handleClick(id)}
  ></i>
);

export default Icon;
