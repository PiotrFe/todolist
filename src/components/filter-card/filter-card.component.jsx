import React, {useEffect} from "react";

import "./filter-card.styles.scss";
import { ActionTypes } from "../../constants/constants";

const FilterCard = ({ item, idx, remove }) => {
  const [key, value] = Object.entries(item)[0];

  return (
    <div className="filter-card">
      {`${key} - ${value}`}
      <button className="filter-card__button" onClick={e => {
        e.stopPropagation();
        remove(item)
      } }>x</button>
    </div>
  );
};

export default FilterCard;
