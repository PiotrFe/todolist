import { ToDoListsActionTypes } from "./todo-lists-container.types";

const {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
  ADD_TODO_START,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  REMOVE_TODO_START,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  UPDATE_TODO_START,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
} = ToDoListsActionTypes;

export const fetchLists = () => ({
  type: FETCH_LISTS_START,
});

export const fetchListsSuccess = (lists) => ({
  type: FETCH_LISTS_SUCCESS,
  payload: lists,
});

export const fetchListsFailure = (error) => ({
  type: FETCH_LISTS_FAILURE,
  payload: error,
});

export const addToDo = ({ listID, todo }) => ({
  type: ADD_TODO_START,
  payload: { listID, todo },
});

export const addToDoSuccess = ({ listID, todo }) => ({
  type: ADD_TODO_SUCCESS,
  payload: ({ listID, todo }),
});

export const addToDoFailure = (error) => ({
  type: ADD_TODO_FAILURE,
  payload: error,
});

export const removeToDo = ({ listID, todoID }) => ({
  type: REMOVE_TODO_START,
  payload: { listID, todoID },
});

export const removeToDoSuccess = ({ listID, todoID }) => ({
  type: REMOVE_TODO_SUCCESS,
  payload: { listID, todoID },
});

export const removeToDoFailure = (error) => ({
  type: REMOVE_TODO_FAILURE,
  payload: error,
});


export const updateToDo = ({ todoID, field, value }) => ({
  type: UPDATE_TODO_START,
  payload: { todoID, field, value },
});

export const updateToDoSuccess = ({ todoID, field, value }) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: { todoID, field, value },
});

export const updateToDoFailure = (error) => ({
  type: UPDATE_TODO_FAILURE,
  payload: error,
});
