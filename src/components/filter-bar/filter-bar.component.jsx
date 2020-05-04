import React, { useEffect } from "react";

import "./filter-bar.styles.scss";

import TodoInput from "../todo-input/todo-input.component";
import FilterCard from "../../components/filter-card/filter-card.component";

import { ActionTypes } from "../../constants/constants";

const FilterBar = ({ content, tags, actions }) => {

  return (
    <div className="filter-bar" onClick={() => {
        document.getElementById("filter-search-field").focus();

    } }>
      {tags.map((item, idx) => (
        <FilterCard key={idx} item={item} idx={idx} remove={actions[ActionTypes.REMOVE]} />
      ))}
      <TodoInput onChange={actions[ActionTypes.CHANGE]} onSubmit={actions[ActionTypes.SUBMIT]} content={content} />
    </div>
  );
};

export default FilterBar;
