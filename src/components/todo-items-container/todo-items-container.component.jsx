import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import {
  asyncActionBegin,
  dropToDo,
  updateToDo,
  updateSorts,
  fetchFilteredToDoS,
} from "../../redux/todo-container/todo-container.actions";

import {
  addToDo,
  removeToDo,
} from "../../redux/todo-lists-container/todo-lists-container.actions";

import {
  selectFilters,
  selectSorts,
} from "../../redux/todo-container/todo-container.selectors";

import { ActionTypes } from "../../constants/constants";

import {DEFAULT_SORTS} from "../../constants/constants";

import "./todo-items-container.styles.scss";
import { useCallback } from "react";

const ToDoItemsContainer = ({
  listID,
  inCockpit = false,
  todoItems,
  title,
  filters = [],
  // filtersLength,
  sorts = DEFAULT_SORTS,
  fetchFilteredToDoS,
  dropToDo,
  removeFilter,
  updateSorts,
  addToDo,
  children,
}) => {
  const { DRAG, EDIT, REMOVE, SORT } = ActionTypes;

  // Local state
  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);

  // Effects
  useEffect(() => {    
      // debugger;
      fetchFilteredToDoS({ listID, filters, sorts });
  }, [filters.length, JSON.stringify(sorts)]);

  // Methods
  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  // HANDLING DRAG
  const toggleDrag = (isEnabled) => {
    toggleDragMode(isEnabled);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dropToDo(source.index, destination.index);
  };

  // if component is rendered in cockpit, it gets a custom NavTob; otherwise gets a default one
  return (
    <div className="todo-items-container">
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
        actions={{
          [REMOVE]: removeFilter,
        }}
      />
      <ToDoItems
        listID={listID}
        todoItems={todoItems}
        actions={{
          [DRAG]: handleDragEnd,
        }}
        dragModeOn={dragModeOn}
      />
      {!inCockpit && editMode ? (
        <>
          <Overlay show={true} onClick={null} opaque={true} />
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
  sorts: selectSorts,
});

const mapDispatchToProps = (dispatch) => ({
  asyncActionBegin: () => dispatch(asyncActionBegin()),
  dropToDo: (idxFrom, idxTo) => dispatch(dropToDo(idxFrom, idxTo)),
  updateSorts: (listID, field) => dispatch(updateSorts({ listID, field })),
  updateToDo: ({ id, field, value }) =>
    dispatch(updateToDo({ id, field, value })),

  addToDo: ({ listID, todo }) => dispatch(addToDo({ listID, todo })),
  removeToDo: ({ listID, todoID }) => dispatch(removeToDo({ listID, todoID })),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
