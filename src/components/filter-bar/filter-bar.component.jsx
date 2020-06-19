import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./filter-bar.styles.scss";

import TodoInput from "../todo-input/todo-input.component";
import FilterCard from "../../components/filter-card/filter-card.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";

import { selectFilters } from "../../redux/todo-container/todo-container.selectors";

import { ActionTypes } from "../../constants/constants";
import { applyFilter, removeFilter } from "../../redux/todo-container/todo-container.actions";

const FilterBar = ({ actions, filters, applyFilter, removeFilter }) => {
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [filterMode, updateFilterMode] = useState(true);
  const [filterPreview, updateFilterPreview] = useState();
  const [filterWord, updateFilterWord] = useState("");

  const { CHANGE, REMOVE, SEARCH, SUBMIT } = ActionTypes;

  useEffect(() => {
    filterBarContent.length < 3
      ? updateFilterMode(false)
      : updateFilterMode(true);
  }, [filterBarContent]);

  const updateFilterBar = (content) => {
    updateFilterBarContent(content);
  };

  const showFilterPreview = (word) => {
    fetch("api/todos/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: filters, keyword: word }),
    })
      .then((res) => res.json())
      .then((todos) => {
        updateFilterMode(true);
        updateFilterWord(word);
        updateFilterPreview(todos);
      });
  };

  const addFilter = (filter) => {
    applyFilter(filter);
    updateFilterPreview();
    updateFilterMode(false);
    updateFilterWord("");
    updateFilterBarContent("");
  };


  return (
    <>
      <div
        className="filter-bar"
        onClick={() => {
          document.getElementById("filter-search-field").focus();
        }}
      >
        {filters.map((item, idx) => (
          <FilterCard
            key={idx}
            item={item}
            idx={idx}
            remove={removeFilter}
          />
        ))}
        <TodoInput
          onChange={updateFilterBar}
          onSubmit={showFilterPreview}
          content={filterBarContent}
        />
      </div>
      {filterMode ? (
        <SearchResultList
          word={filterWord}
          preview={filterPreview}
          search={addFilter}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters
});

const mapDispatchToProps = dispatch => ({
  applyFilter: filter => dispatch(applyFilter(filter)),
  removeFilter: filter => dispatch(removeFilter(filter)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
