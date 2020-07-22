import React from "react";

import { IconClasses } from "./icon.types";

import "./icon.styles.scss";

const Icon = ({type, parent, size, onClick}) => (
  <i
    className={`icon icon--${size} ${parent}__icon ${IconClasses[type]}`}
    onClick={() => onClick()}
    data-testid={`icon_${onClick}`}
  ></i>
);

export default Icon;
