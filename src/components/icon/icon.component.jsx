import React from "react";

import { IconClasses } from "./icon.types";
import { Components } from "../../constants/constants";

import "./icon.styles.scss";

const Icon = ({type, onClick, idx, parent, size}) => (
  <i
    className={`icon icon--${size} ${parent}__icon ${IconClasses[type]}`}
    onClick={() => {
      onClick(idx);
    } }
  ></i>
);

export default Icon;
