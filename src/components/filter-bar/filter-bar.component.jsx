import React, { useEffect } from "react";

import "./filter-bar.styles.scss";

import TodoInput from "../todo-input/todo-input.component";
import FilterCard from "../../components/filter-card/filter-card.component";

import { ActionTypes } from "../../constants/constants";

const FilterBar = ({ items, actions }) => {

  return (
    <div className="filter-bar" onClick={() => {
        document.getElementById("filter-search-field").focus();
        console.log("Bar also clicked")

    } }>
      {items.map((item, idx) => (
        <FilterCard key={idx} item={item} idx={idx} actions={actions} />
      ))}
      <TodoInput onSearch={actions[ActionTypes.SEARCH]} onType={actions[ActionTypes.CHANGE]} />
    </div>
  );
};

export default FilterBar;
