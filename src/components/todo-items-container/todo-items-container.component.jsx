import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import {
  asyncActionBegin,
  addToDo,
  dropToDo,
  fetchToDos,
  removeToDo,
  updateToDo,
  updateSorts,
} from "../../redux/todo-container/todo-container.actions";

import {
  selectToDos,
  selectFilters,
  selectSorts,
  selectLoading,
  selectError,
} from "../../redux/todo-container/todo-container.selectors";

import { ActionTypes } from "../../constants/constants";

import { makeAPICall } from "./todo-items-container.utils";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = ({
  loading,
  todoItems,
  filters,
  sorts,
  addToDo,
  asyncActionBegin,
  dropToDo,
  fetchToDos,
  removeFilter,
  removeToDo,
  updateSorts,
  updateToDo,
}) => {
  const {
    ADD,
    CHANGE_COLOR,
    DONE,
    DRAG,
    EDIT,
    REMOVE,
    SORT,
    UPDATE,
  } = ActionTypes;

  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);

  // EFFECTS

  useEffect(() => {
    asyncActionBegin();
    fetchToDos({filters, sorts});
  }, [filters, sorts]);

  // METHODS

  const handleToDoAdd = (newToDoObj) => {
    asyncActionBegin();
    addToDo(newToDoObj);
    toggleEditMode();
  };

  const handleToDoRemove = (id) => {
    asyncActionBegin();
    removeToDo(id);
  };

  const handleToDoDone = (id) => {
    const todo = todoItems.find((item) => item._id === id);
    handleToDoUpdate({ id: todo._id, field: "done", value: !todo.done });
  };

  const handleToDoChangeColor = ({ id, color }) => {
    handleToDoUpdate({ id, field: "color", value: color });
  };

  const handleToDoUpdate = ({ id, field, value }) => {
    asyncActionBegin();
    updateToDo({ id, field, value });
  };

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

  return (
    <>
      <NavTop
        sorts={sorts}
        actions={{
          [DRAG]: toggleDrag,
          [EDIT]: toggleEditMode,
          [SORT]: updateSorts,
        }}
        dragModeOn={dragModeOn}
      />
      <FilterBar
        actions={{
          [REMOVE]: removeFilter,
        }}
      />
      <ToDoItems
        todoItems={todoItems}
        actions={{
          [ADD]: handleToDoAdd,
          [CHANGE_COLOR]: handleToDoChangeColor,
          [DONE]: handleToDoDone,
          [DRAG]: handleDragEnd,
          [REMOVE]: handleToDoRemove,
          [UPDATE]: handleToDoUpdate,
        }}
        dragModeOn={dragModeOn}
      />
      {loading ? (
        <>
          <Overlay show={loading} onClick={null} opaque={true} />
          <LoadingSpinner />
        </>
      ) : null}
      {editMode ? (
        <>
          <Overlay show={true} onClick={null} opaque={true} />
          <ToDoModal
            actions={{
              [ActionTypes.CANCEL]: toggleEditMode,
              [ActionTypes.EDIT]: handleToDoUpdate,
              [ActionTypes.SUBMIT]: handleToDoAdd,
            }}
          />
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  todoItems: selectToDos,
  filters: selectFilters,
  sorts: selectSorts,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  asyncActionBegin: () => dispatch(asyncActionBegin()),
  addToDo: (todo) => dispatch(addToDo(todo)),
  dropToDo: (idxFrom, idxTo) => dispatch(dropToDo(idxFrom, idxTo)),
  fetchToDos: ({ filters, sorts }) => dispatch(fetchToDos({ filters, sorts })),
  removeToDo: (id) => dispatch(removeToDo(id)),
  updateSorts: (field) => dispatch(updateSorts(field)),
  updateToDo: ({ id, field, value }) =>
    dispatch(updateToDo({ id, field, value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
