import { TodoContainerTypes } from "./todo-container.types";

const {
  ADD_TODO_START,
  ADD_FILTER,
  ASYNC_ACTION_BEGIN,
  DROP_TODO,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_FILTER,
  UPDATE_SORTS,
  UPDATE_TODO_START,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
} = TodoContainerTypes;

export const addToDo = ({ listID, item }) => ({
  type: ADD_TODO_START,
  payload: { listID, item },
});

export const asyncActionBegin = () => ({ type: ASYNC_ACTION_BEGIN });

export const dropToDo = (idxFrom, idxTo) => ({
  type: DROP_TODO,
  payload: { idxFrom, idxTo },
});

export const updateToDo = ({ id, field, value }) => ({
  type: UPDATE_TODO_START,
  payload: { id, field, value },
});

export const updateToDoSuccess = ({ _id, field, value }) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: { _id, field, value },
});

export const updateToDoFailure = (error) => ({
  type: UPDATE_TODO_FAILURE,
  payload: error,
});

export const addFilter = ({ listID, filter }) => ({
  type: ADD_FILTER,
  payload: { listID, filter },
});

export const removeFilter = ({ listID, filter }) => ({
  type: REMOVE_FILTER,
  payload: { listID, filter },
});

export const fetchFilteredToDoS = ({ listID, filters, sorts }) => ({
  type: FETCH_TODOS_START,
  payload: { listID, filters, sorts },
});

export const fetchToDoSSuccess = ({ listID, todos, filters = [], sorts = {} }) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: { listID, todos, filters, sorts },
});

export const fetchToDoSFailure = ({ listID, error }) => ({
  type: FETCH_TODOS_FAILURE,
  payload: { listID, error },
});

export const updateSorts = ({ listID, field }) => ({
  type: UPDATE_SORTS,
  payload: { listID, field },
});
