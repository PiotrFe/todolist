import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./filter-bar.styles.scss";

import TodoInput from "../todo-input/todo-input.component";
import FilterCard from "../../components/filter-card/filter-card.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";

import {selectFilters} from "../../redux/filters/filters.selectors";

import {
  selectFilterPreview,
  selectFilterLoading,
  selectActiveFiltersFromMainFilter,
} from "../../redux/filter-bar/filter-bar.selectors";

import {
  ActionTypes,
  FILTER_STATUS,
  MAIN_INPUT_ID,
} from "../../constants/constants";

import {
  addFilter,
  removeFilter,
  fetchFilteredToDoS,
} from "../../redux/filter-bar/filter-bar.actions";

import {
  showFilterPreview,
  clearFilterPreview,
  setFiltersAndPreviewStore,
} from "../../redux/filter-bar/filter-bar.actions";

import {
  updateActiveFilters,
  clearActiveStatusFromFilters,
} from "./filter-bar.utils";

const FilterBar = ({
  listID,
  filters = [],
  globalFilters = [],
  sorts,
  placeholder,
  filterPreview,
  loading,
  disabled,
  inCockpit,
  addFilter,
  removeFilter,
  showFilterPreview,
  clearFilterPreview,
  setFiltersAndPreviewStore,
  fetchFilteredToDoS,
}) => {
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [filterMode, updateFilterMode] = useState(true);
  const [filterWord, updateFilterWord] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const { CHANGE, REMOVE, SEARCH, SUBMIT } = ActionTypes;

  const didMountRef = useRef(false);
  const inputEl = useRef(null);

  const fetchData = useCallback(() => {
    fetchFilteredToDoS({ listID, filters, sorts });
    setActiveFilters(filters);
  }, [filters.length, JSON.stringify(sorts)]);

  const fetchPreview = useCallback(() => {
    if (filterBarContent.length >= 3) {
      updateFilterMode(true);
      fetchFilterPreview(filterBarContent);
    } else {
      updateFilterMode(false);
    }
    if (filterBarContent.length === 2) {
      clearFilterPreview(listID);
    }
  }, [filterBarContent]);

  useEffect(() => {
    setFiltersAndPreviewStore(listID);
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      fetchData();
    } else didMountRef.current = true;
  }, [fetchData]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  useEffect(() => {
    if (listID !== MAIN_INPUT_ID) {
      if (globalFilters.length === 0) {
        setActiveFilters(clearActiveStatusFromFilters(filters));
      } else {
        setActiveFilters(updateActiveFilters({ globalFilters, filters }));
      }
    }
  }, [globalFilters.length]);

  const updateFilterBar = (content) => {
    updateFilterBarContent(content);
  };

  const fetchFilterPreview = (word) => {
    updateFilterWord(word);
    showFilterPreview({ listID, filters, word });
  };

  const applyFilter = (filter) => {
    addFilter({
      listID,
      filter: {
        ...filter,
        status: FILTER_STATUS.ACTIVE,
      },
    });
    updateFilterMode(false);
    updateFilterWord("");
    updateFilterBarContent("");
  };

  const deleteFilter = (filter) => {
    removeFilter({ listID, filter });
  };

  return (
    <>
      <div
        className="filter-bar"
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        {activeFilters.map((item, idx) => (
          <FilterCard key={idx} item={item} remove={deleteFilter} />
        ))}
        <TodoInput
          onChange={updateFilterBar}
          content={filterBarContent}
          ref={inputEl}
          placeholder={placeholder}
          inCockpit={inCockpit}
          disabled={disabled}
        />
      </div>
      {filterMode ? (
        <SearchResultList
          word={filterWord}
          preview={filterPreview}
          filters={filters}
          search={applyFilter}
          loading={loading}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
  globalFilters: selectActiveFiltersFromMainFilter,
  // sorts: selectSorts,
  filterPreview: selectFilterPreview,
  loading: selectFilterLoading,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: ({ listID, filter }) => dispatch(addFilter({ listID, filter })),
  removeFilter: ({ listID, filter }) =>
    dispatch(removeFilter({ listID, filter })),
  showFilterPreview: ({ listID, filters, word }) =>
    dispatch(showFilterPreview({ listID, filters, word })),
  clearFilterPreview: (listID) => dispatch(clearFilterPreview(listID)),
  setFiltersAndPreviewStore: (listID) =>
    dispatch(setFiltersAndPreviewStore(listID)),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
