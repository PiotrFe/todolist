import React from "react";

import { IconClasses } from "./icon.types";

import "./icon.styles.scss";

const Icon = props => (
  <i
    className={`todo-item__icon ${IconClasses[props.type]}`}
    onClick={() => props.onClick(props.idx, "this item has been edited")}
  ></i>
);

export default Icon;
