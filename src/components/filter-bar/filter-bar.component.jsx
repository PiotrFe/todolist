import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Icon } from "rsuite";
import TodoInput from "../todo-input/todo-input.component";
// import FilterCard from "../../components/filter-card/filter-card.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";

import {
  selectFilterPreview,
  selectFilterLoading,
} from "../../redux/filter-bar/filter-bar.selectors";
import {
  selectFilters,
  selectGlobalFilters,
} from "../../redux/filters/filters.selectors";
import { selectSorts } from "../../redux/sorts/sorts.selectors";

import { FILTER_STATUS, MAIN_INPUT_ID } from "../../constants/constants";

import {
  addFilter,
  removeFilter,
  fetchFilteredToDoS,
  showFilterPreview,
  clearFilterPreview,
  clearFilters,
} from "../../redux/filter-bar/filter-bar.actions";

import {
  updateActiveFilters,
  clearActiveStatusFromFilters,
} from "./filter-bar.utils";

import "./filter-bar.styles.scss";

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
  clearFilters,
  showFilterPreview,
  clearFilterPreview,
  fetchFilteredToDoS,
}) => {
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [filterMode, updateFilterMode] = useState(false);
  const [filterWord, updateFilterWord] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const didMountRef = useRef(false);
  const inputEl = useRef(null);

  const fetchData = useCallback(() => {
    fetchFilteredToDoS({ listID, filters, sorts });
    setActiveFilters(filters);
  }, [filters.length, JSON.stringify(sorts)]);

  const fetchPreview = useCallback(() => {
    if (filterBarContent.length >= 3) {
      updateFilterWord(filterBarContent);
      updateFilterMode(true);
      showFilterPreview({ listID, filters, word: filterBarContent });
    } else {
      updateFilterMode(false);
    }
    if (filterBarContent.length === 2) {
      clearFilterPreview(listID);
    }
  }, [filterBarContent]);

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

  // const updateFilterBar = (content) => {
  //   updateFilterBarContent(content);
  // };

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

  const handleClearInput = () => updateFilterBarContent("");

  return (
    <>
      <div
        className="filter-bar"
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        <div className="todo-input-wrapper">
          <TodoInput
            onChange={updateFilterBarContent}
            content={filterBarContent}
            ref={inputEl}
            activeFilters={activeFilters}
            placeholder={placeholder}
            inCockpit={inCockpit}
            disabled={disabled}
            onEscPress={handleClearInput}
            deleteFilter={deleteFilter}
          />
          <div className="clear-filters-icon">
            <Icon
              icon="close-circle"
              onClick={() => {
                clearFilters({ listID });
                updateFilterBarContent("");
                inputEl.current.focus();
              }}
            />
          </div>
        </div>
      </div>
      {filterMode && (
        <SearchResultList
          word={filterWord}
          preview={filterPreview}
          filters={filters}
          search={applyFilter}
          loading={loading}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
  globalFilters: selectGlobalFilters,
  sorts: selectSorts,
  filterPreview: selectFilterPreview,
  loading: selectFilterLoading,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: ({ listID, filter }) => dispatch(addFilter({ listID, filter })),
  removeFilter: ({ listID, filter }) =>
    dispatch(removeFilter({ listID, filter })),
  clearFilters: ({ listID }) => dispatch(clearFilters({ listID })),
  showFilterPreview: ({ listID, filters, word }) =>
    dispatch(showFilterPreview({ listID, filters, word })),
  clearFilterPreview: (listID) => dispatch(clearFilterPreview(listID)),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
