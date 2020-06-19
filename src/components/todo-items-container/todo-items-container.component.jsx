import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import {
  asyncActionBegin,
  addToDo,
  dropToDo,
  fetchToDosSuccess,
  fetchToDosFailure,
  removeTodo,
  updateTodo,
  removeFilter,
  updateSorts,
} from "../../redux/todo-container/todo-container.actions";

import {
  selectToDos,
  selectFilters,
  selectSorts,
  selectLoading,
  selectError,
  selectToDosCount,
  selectToDosDoneCount,
  selectToDosPendingCount,
} from "../../redux/todo-container/todo-container.selectors";

import { ActionTypes, ToDoFields } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

import { makeAPICall } from "./todo-items-container.utils";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = ({
  error,
  loading,
  todoItems,
  filters,
  sorts,
  addToDo,
  asyncActionBegin,
  dropToDo,
  fetchToDosSuccess,
  fetchToDosFailure,
  removeFilter,
  removeTodo,
  updateSorts,
  updateTodo,
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

    fetch("/api/todos/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters, sorts }),
    })
      .then((res) => res.json())
      .then((todos) => {
        fetchToDosSuccess(todos);
      })
      .catch((err) => {
        fetchToDosFailure(err);
      });
  }, [filters, sorts]);

  // TO-DO METHODS

  const handleToDoAdd = async (newToDoObj) => {
    asyncActionBegin();

    const todo = await makeAPICall({
      URL: "/api/todos",
      method: "POST",
      body: JSON.stringify(newToDoObj),
    });

    addToDo(JSON.parse(todo));
    toggleEditMode();

  };

  const handleToDoRemove = async (id) => {
    asyncActionBegin();

    const { _id } = await makeAPICall({
      URL: `/api/todos/${id}`,
      method: "POST",
    });

    removeTodo(_id);
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
    console.log(
      `Update function received valuues: ID: ${id}, FIELD: ${field}, VALUE: ${value} `
    );

    fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, value }),
    })
      .then((res) => res.json())
      .then(({ _id, field, value }) => updateTodo({ _id, field, value }));
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
  fetchToDosSuccess: (todos) => dispatch(fetchToDosSuccess(todos)),
  fetchToDosFailure: (err) => dispatch(fetchToDosFailure(err)),
  // removeFilter: (filter) => dispatch(removeFilter(filter)),
  removeTodo: (id) => dispatch(removeTodo(id)),
  updateSorts: (field) => dispatch(updateSorts(field)),
  updateTodo: ({ _id, field, value }) =>
    dispatch(updateTodo({ _id, field, value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
