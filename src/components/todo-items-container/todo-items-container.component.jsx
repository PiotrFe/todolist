import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoList from "../../components/todo-list/todo-list.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import ButtonBar from "../../components/button-bar/button-bar.component";

import { ActionTypes } from "../../constants/constants";

import {
  addToDo,
  removeToDo,
  updateToDo,
  dropToDo,
  updateSorts,
  removeList,
  replaceToDo,
} from "../../redux/todo-lists-container/todo-lists-container.actions";

import { selectTitle } from "../../redux/todo-list/todo-list.selectors";
import {
  selectFilters,
  selectGlobalFiltersCount,
} from "../../redux/filters/filters.selectors";
import { selectSorts } from "../../redux/sorts/sorts.selectors";
import { fetchFilteredToDoS } from "../../redux/filter-bar/filter-bar.actions";
import { selectVisibleItems } from "../../redux/todo-item/todo-item.selectors";

import { generateCVSData, onDrop } from "./todo-items-container.utils";
import { downloadCSV } from "../../utils/utils";
import { NO_SORTS } from "../../constants/constants";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = ({
  listID,
  inCockpit = false,
  title,
  filters,
  globalFiltersCount,
  sorts,
  visibleItems,
  addToDo,
  dropToDo,
  removeToDo,
  updateToDo,
  updateSorts,
  removeList,
  fetchFilteredToDoS,
  replaceToDo,
}) => {
  const { DRAG, EDIT, REMOVE, SORT, UPDATE } = ActionTypes;

  // Local state
  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);
  const [inputDisabled, toggleInputDisabled] = useState(false);

  const didMount = useRef(false);
  const mainInputFiltersChangedAfterRender = useRef(false);

  useEffect(() => {
    if (mainInputFiltersChangedAfterRender.current) {
      if (globalFiltersCount === 0) {
        toggleInputDisabled(false);
      } else {
        toggleInputDisabled(true);
      }
    } else mainInputFiltersChangedAfterRender.current = true;
  }, [JSON.stringify(globalFiltersCount)]);

  // Methods
  const handleUpdateSorts = (sorts, field) => {
    updateSorts({ listID, sorts, field });
  };

  const handleToDoRemove = ({ todoID }) => {
    removeToDo({ todoID, listID });
  };

  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  const handleToDoUpdate = ({ todoID, field, value }) => {
    updateToDo({ todoID, field, value });
  };

  const handleToDoEdit = ({ todo }) => {
    replaceToDo({ listID, todo });
  };

  const handleCSVDownload = () => {
    const CSVData = generateCVSData({ visibleItems, title });
    downloadCSV(CSVData, title);
  };

  const handleRemoveList = () => {
    removeList(listID);
  };

  const toggleDrag = (isEnabled) => {
    toggleDragMode(isEnabled);
    if (isEnabled) updateSorts({ listID, sorts: NO_SORTS });
  };

  const handleDragEnd = (result) => {
    if (onDrop(result)) {
      const { from, to } = onDrop(result);
      dropToDo({ listID, from, to });
    }
  };

  const handleRefreshView = () => {
    fetchFilteredToDoS({ listID, filters, sorts });
  };

  // if component is rendered in cockpit, it gets a custom NavTob; otherwise gets a default one
  return (
    <div
      className={`todo-items-container ${
        inCockpit ? "todo-items-container--cockpit" : null
      }`}
    >
      <div className="todo-items-container__header-group">
        <div className="todo-items-container__title">{title}</div>
        <NavTop
          listID={listID}
          actions={{
            [DRAG]: toggleDrag,
            [EDIT]: toggleEditMode,
            [SORT]: handleUpdateSorts,
          }}
        />
        <div className="header-top__action-icons">
          <ButtonBar
            actions={{
              toggleDrag,
              toggleEditMode,
              handleCSVDownload,
              handleRemoveList,
              handleRefreshView,
            }}
          />
        </div>
        <FilterBar
          listID={listID}
          inCockpit={inCockpit}
          placeholder={"Type to search in list"}
          disabled={inputDisabled}
        />
      </div>

      <ToDoList
        listID={listID}
        actions={{
          [DRAG]: handleDragEnd,
          [REMOVE]: handleToDoRemove,
          [UPDATE]: handleToDoUpdate,
          [EDIT]: handleToDoEdit,
        }}
        dragModeOn={dragModeOn}
      />
      {!inCockpit && editMode ? (
        <>
          <ToDoModal
            listID={listID}
            actions={{
              [ActionTypes.CANCEL]: toggleEditMode,
              [ActionTypes.SUBMIT]: ({ listID, todo }) => {
                toggleEditMode(!editMode);
                addToDo({ listID, todo });
              },
            }}
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  title: selectTitle,
  filters: selectFilters,
  sorts: selectSorts,
  globalFiltersCount: selectGlobalFiltersCount,
  visibleItems: selectVisibleItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToDo: ({ listID, todo }) => dispatch(addToDo({ listID, todo })),
  dropToDo: ({ listID, from, to }) => dispatch(dropToDo({ listID, from, to })),
  removeToDo: ({ todoID, listID }) => dispatch(removeToDo({ todoID, listID })),
  updateToDo: ({ todoID, field, value }) =>
    dispatch(updateToDo({ todoID, field, value })),
  updateSorts: ({ listID, sorts, field }) =>
    dispatch(updateSorts({ listID, sorts, field })),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
  removeList: (listID) => dispatch(removeList(listID)),
  replaceToDo: ({ listID, todo }) => dispatch(replaceToDo({ listID, todo })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
