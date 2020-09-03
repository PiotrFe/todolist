import React, { useEffect } from "react";

import "./filter-card.styles.scss";
import { ActionTypes, FILTER_STATUS } from "../../constants/constants";

const FilterCard = ({ item, remove }) => {
  const [key, value] = Object.entries(item)[0];
  const status = Object.values(item)[1];

  const handleClick = (e) => {
    e.stopPropagation();
    remove({ [key]: value });
  };

  let buttonProps = {
    onClick: (e) => {
      handleClick(e);
    },
  };

  if (
    status === FILTER_STATUS.HIGHLIGHTED ||
    status === FILTER_STATUS.DISABLED
  ) {
    buttonProps.onClick = null;
  }

  let classNameModifiers = ``;

  if (status === FILTER_STATUS.HIGHLIGHTED) {
    classNameModifiers = "filter-card--highlighted"
  }

  if (status === FILTER_STATUS.DISABLED) {
    classNameModifiers = "filter-card--disabled"
  }

  return (
    <div className={`filter-card ${classNameModifiers}`}>
      {`${key}: ${value}`}
      <button className="filter-card__button" {...buttonProps}>
        x
      </button>
    </div>
  );
};

export default FilterCard;
