import React, {useEffect} from "react";

import "./filter-card.styles.scss";
import { ActionTypes } from "../../constants/constants";

const FilterCard = ({ item, idx, remove }) => {


  return (
    <div className="filter-card">
      {`${item.header} - ${item.entry}`}
      <button className="filter-card__button" onClick={e => {
        e.stopPropagation();
        remove(item)
      } }>x</button>
    </div>
  );
};

export default FilterCard;
