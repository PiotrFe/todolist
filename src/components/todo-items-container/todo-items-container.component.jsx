import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoList from "../../components/todo-list/todo-list.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import { Toggle, Button } from "rsuite";

import { ActionTypes } from "../../constants/constants";

import {
  addToDo,
  removeToDo,
  updateToDo,
  dropToDo,
  updateSorts
} from "../../redux/todo-lists-container/todo-lists-container.actions";
import { fetchFilteredToDoS } from "../../redux/filter-bar/filter-bar.actions";

// import { selectSorts } from "../../redux/todo-container/todo-container.selectors";
import { selectTitle } from "../../redux/todo-list/todo-list.selectors";

import {
  selectFilters,
  selectDataFromMainFilter,
} from "../../redux/filter-bar/filter-bar.selectors";

import { DEFAULT_SORTS } from "../../constants/constants";
import {
  generateCVSData,
  filterToDos,
  onDrop,
} from "./todo-items-container.utils";
import { downloadCSV } from "../../utils/utils";

import "./todo-items-container.styles.scss";
import { useCallback } from "react";

const ToDoItemsContainer = ({
  listID,
  inCockpit = false,
  title,
  filters = [],
  todoItems,
  mainInputFilteredData,
  addToDo,
  dropToDo,
  fetchFilteredToDoS,
  sorts = DEFAULT_SORTS,
  removeToDo,
  updateSorts,
  updateToDo,
  children,
}) => {
  const { DRAG, EDIT, REMOVE, SORT, UPDATE } = ActionTypes;

  // Local state
  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);
  const [localView, updateLocalView] = useState(todoItems);
  const [inputDisabled, toggleInputDisabled] = useState(false);

  const didMount = useRef(false);
  const mainInputFiltersChangedAfterRender = useRef(false);

  // Callbacks
  const filterData = useCallback(() => {
    return filterToDos({
      mainSet: todoItems,
      subSet: mainInputFilteredData.todos,
    });
  }, [JSON.stringify(todoItems)]);

  // Effects
  useEffect(() => {
    updateLocalView(filterData());
  }, [filterData]);

  useEffect(() => {
    if (mainInputFiltersChangedAfterRender.current) {
      if (mainInputFilteredData.filters.length === 0) {
        updateLocalView(todoItems);
        toggleInputDisabled(false);
      } else {
        updateLocalView(mainInputFilteredData.todos);
        toggleInputDisabled(true);
      }
    } else mainInputFiltersChangedAfterRender.current = true;
  }, [JSON.stringify(mainInputFilteredData)]);

  // Methods
  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  const handleToDoUpdate = ({ todoID, field, value }) => {
    updateToDo({ todoID, field, value });
  };

  const handleCSVDownload = () => {
    const CSVData = generateCVSData({ localView, title });
    downloadCSV(CSVData, title);
  };

  // HANDLING DRAG
  const toggleDrag = (isEnabled) => {
    toggleDragMode(isEnabled);
  };

  const handleDragEnd = (result) => {
    if (onDrop(result)) {
      const { from, to } = onDrop(result);
      dropToDo({ listID, from, to });
    }
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
        {inCockpit ? (
          children
        ) : (
          <NavTop
            listID={listID}
            actions={{
              [DRAG]: toggleDrag,
              [EDIT]: toggleEditMode,
              [SORT]: updateSorts,
            }}
            sorts={sorts}
            dragModeOn={dragModeOn}
          />
        )}

        <FilterBar
          listID={listID}
          inCockpit={inCockpit}
          placeholder={"Type to search in list"}
          disabled={inputDisabled}
        />

        <div className="header-top__action-icons">
          <Toggle
            size="md"
            checkedChildren="Ready"
            unCheckedChildren="Sort"
            onChange={toggleDrag}
          />
          <Button side="md" onClick={(listID, toggleEditMode)}>
            Add
          </Button>
          <Button side="md" onClick={handleCSVDownload}>
            Download
          </Button>
        </div>
      </div>

      <ToDoList
        listID={listID}
        // todoItems={localView}
        actions={{
          [DRAG]: handleDragEnd,
          [REMOVE]: removeToDo,
          [UPDATE]: handleToDoUpdate,
        }}
        dragModeOn={dragModeOn}
        // sorts={sorts}
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
  filters: selectFilters,
  // sorts: selectSorts,
  mainInputFilteredData: selectDataFromMainFilter,
  title: selectTitle
});

const mapDispatchToProps = (dispatch) => ({
  addToDo: ({ listID, todo }) => dispatch(addToDo({ listID, todo })),
  dropToDo: ({ listID, from, to }) => dispatch(dropToDo({ listID, from, to })),
  removeToDo: ({ todoID, listID }) => dispatch(removeToDo({ todoID, listID })),
  updateSorts: (listID, field) => dispatch(updateSorts({ listID, field })),
  updateToDo: ({ todoID, field, value }) =>
    dispatch(updateToDo({ todoID, field, value })),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
