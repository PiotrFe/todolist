import React, {useEffect} from "react";

import "./filter-card.styles.scss";
import { ActionTypes } from "../../constants/constants";

const FilterCard = ({ item, idx, actions }) => {


  return (
    <div className="filter-card">
      {item}
      <button className="filter-card__button" onClick={e => {
        e.stopPropagation();
        console.log("clicked button");
        console.log("event phase " + e.eventPhase );
        actions[ActionTypes.REMOVE](idx)

      } }>x</button>
    </div>
  );
};

export default FilterCard;
