import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./filter-bar.styles.scss";

import TodoInput from "../todo-input/todo-input.component";
import FilterCard from "../../components/filter-card/filter-card.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";

import { selectFilters } from "../../redux/todo-container/todo-container.selectors";
import { selectFilterPreview } from "../../redux/filter-bar/filter-bar.selectors";

import { fetchFilteredToDoS } from "../../redux/todo-container/todo-container.actions";

import { ActionTypes } from "../../constants/constants";

import {
  addFilter,
  removeFilter,
} from "../../redux/todo-container/todo-container.actions";
import { showFilterPreview } from "../../redux/filter-bar/filter-bar.actions";

const FilterBar = ({
  listID,
  filters,
  filterPreview,
  addFilter,
  removeFilter,
  showFilterPreview,
  fetchFilteredToDoS
}) => {
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [filterMode, updateFilterMode] = useState(true);
  // const [filterPreview, updateFilterPreview] = useState();
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

  const fetchFilterPreview = (word) => {
    updateFilterMode(true);
    updateFilterWord(word);
    showFilterPreview({ listID, filters, word });
  };

  const applyFilter = (filter) => {
    addFilter({ listID, filter });
    updateFilterMode(false);
    updateFilterWord("");
    updateFilterBarContent("");
    fetchFilteredToDoS({ listID, filters });
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
          <FilterCard key={idx} item={item} idx={idx} remove={removeFilter} />
        ))}
        <TodoInput
          onChange={updateFilterBar}
          onSubmit={fetchFilterPreview}
          content={filterBarContent}
        />
      </div>
      {filterMode ? (
        <SearchResultList
          word={filterWord}
          preview={filterPreview}
          search={applyFilter}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
  filterPreview: selectFilterPreview,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: ({ listID, filter }) => dispatch(addFilter({ listID, filter })),
  removeFilter: (filter) => dispatch(removeFilter(filter)),
  showFilterPreview: ({ listID, filters, word }) =>
    dispatch(showFilterPreview({ listID, filters, word })),
  fetchFilteredToDoS: ({ listID, filters }) =>
    dispatch(fetchFilteredToDoS({ listID, filters })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
