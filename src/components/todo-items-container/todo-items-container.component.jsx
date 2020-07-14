import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import TodoInput from "../../components/todo-input/todo-input.component";

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

import { selectFilters } from "../../redux/todo-container/todo-container.selectors";

import { ActionTypes } from "../../constants/constants";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = ({
  listID,
  inCockpit = false,
  todoItems,
  title,
  dropToDo,
  removeFilter,
  updateSorts,
  addToDo,
  children,
}) => {
  const { DRAG, EDIT, REMOVE, SORT } = ActionTypes;

  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);

  // METHODS

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
  }

  // if component is rendered in cockpit, it gets a custom NavTob; otherwise gets a default one
  return (
    <div className="todo-items-container">
      <div className="todo-items-container__title">{title}</div>
      {inCockpit ? children : (
        <NavTop
          listID={listID}
          actions={{
            [DRAG]: toggleDrag,
            [EDIT]: toggleEditMode,
            [SORT]: updateSorts,
          }}
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
});

const mapDispatchToProps = (dispatch) => ({
  asyncActionBegin: () => dispatch(asyncActionBegin()),
  dropToDo: (idxFrom, idxTo) => dispatch(dropToDo(idxFrom, idxTo)),
  updateSorts: (field) => dispatch(updateSorts(field)),
  updateToDo: ({ id, field, value }) =>
    dispatch(updateToDo({ id, field, value })),

  addToDo: ({ listID, todo }) => dispatch(addToDo({ listID, todo })),
  removeToDo: ({ listID, todoID }) => dispatch(removeToDo({ listID, todoID })),
  fetchFilteredToDoS: ({ listID, filters }) =>
    dispatch(fetchFilteredToDoS({ listID, filters })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
