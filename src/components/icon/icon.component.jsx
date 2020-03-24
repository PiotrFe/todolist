import React from "react";

import { IconClasses } from "./icon.types";
import { Components } from "../../constants/constants";

import "./icon.styles.scss";

const Icon = ({type, onClick, id, parent, size}) => (
  <i
    className={`icon icon--${size} ${parent}__icon ${IconClasses[type]}`}
    onClick={() => {
      onClick(id);
    } }
  ></i>
);

export default Icon;
