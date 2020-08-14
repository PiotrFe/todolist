import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TodoInput from "../todo-input/todo-input.component";
import FilterCard from "../../components/filter-card/filter-card.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";
import Overlay from "../../components/overlay/overlay.component";

import {
  selectFilterPreview,
  selectFilterLoading,
} from "../../redux/filter-bar/filter-bar.selectors";
import {
  selectFilters,
  selectGlobalFilters,
} from "../../redux/filters/filters.selectors";
import { selectSorts } from "../../redux/sorts/sorts.selectors";
import { selectAddListMode } from "../../redux/todo-lists-container/todo-lists-container.selectors";

import { FILTER_STATUS, MAIN_INPUT_ID } from "../../constants/constants";

import {
  addFilter,
  removeFilter,
  fetchFilteredToDoS,
  showFilterPreview,
  clearFilterPreview,
} from "../../redux/filter-bar/filter-bar.actions";

import { toggleAddListMode, addList } from "../../redux/todo-lists-container/todo-lists-container.actions";

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
  addListMode,
  addList,
  addFilter,
  removeFilter,
  showFilterPreview,
  clearFilterPreview,
  fetchFilteredToDoS,
  toggleAddListMode,
}) => {
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [newListName, updateNewListName] = useState("");
  const [filterMode, updateFilterMode] = useState(true);
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

  const handleAddList = () => {
    toggleAddListMode();
    updateNewListName("");
    addList(newListName);
  }

  const customInput = (
    <TodoInput
      content={newListName}
      onChange={(val) => updateNewListName(val)}
      placeholder="Enter list name"
      ref={inputEl}
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleAddList}
    />
  );

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
      {filterMode && (
        <SearchResultList
          word={filterWord}
          preview={filterPreview}
          filters={filters}
          search={applyFilter}
          loading={loading}
        />
      )}
      {addListMode && <Overlay onClick={toggleAddListMode}>{customInput}</Overlay>}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
  globalFilters: selectGlobalFilters,
  sorts: selectSorts,
  filterPreview: selectFilterPreview,
  loading: selectFilterLoading,
  addListMode: selectAddListMode,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: ({ listID, filter }) => dispatch(addFilter({ listID, filter })),
  removeFilter: ({ listID, filter }) =>
    dispatch(removeFilter({ listID, filter })),
  showFilterPreview: ({ listID, filters, word }) =>
    dispatch(showFilterPreview({ listID, filters, word })),
  clearFilterPreview: (listID) => dispatch(clearFilterPreview(listID)),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
  toggleAddListMode: () => dispatch(toggleAddListMode()),
  addList: (listTitle) => dispatch(addList(listTitle))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
