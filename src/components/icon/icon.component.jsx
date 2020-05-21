import React from "react";

import { IconClasses } from "./icon.types";
import { Components } from "../../constants/constants";

import "./icon.styles.scss";

const Icon = ({type, id, parent, size, handleClick, editMode}) => (
  <i
    className={`icon icon--${size} ${parent}__icon ${IconClasses[type]}`}
    onClick={() => handleClick(id)}
  ></i>
);

export default Icon;
