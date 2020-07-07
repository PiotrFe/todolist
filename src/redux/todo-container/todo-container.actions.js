import { ToDosActiontypes } from "./todo-container.types";

const {
  ADD_TODO_START,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  ADD_FILTER,
  ASYNC_ACTION_BEGIN,
  DROP_TODO,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_FILTER,
  REMOVE_TODO_START,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  UPDATE_SORTS,
  UPDATE_TODO_START,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE
} = ToDosActiontypes;

export const addToDo = ({listID, item}) => ({ type: ADD_TODO_START, payload: {listID, item} });

// export const addToDoSuccess = (item) => ({
//   type: ADD_TODO_SUCCESS,
//   payload: item,
// });

// export const addToDoFailure = (error) => ({
//   type: ADD_TODO_FAILURE,
//   payload: error,
// });

export const asyncActionBegin = () => ({ type: ASYNC_ACTION_BEGIN });

export const dropToDo = (idxFrom, idxTo) => ({
  type: DROP_TODO,
  payload: { idxFrom, idxTo },
});

// export const fetchToDos = ({ filters, sorts }) => ({
//   type: FETCH_TODOS_START,
//   payload: { filters, sorts },
// });

// export const fetchToDosSuccess = (items) => ({
//   type: FETCH_TODOS_SUCCESS,
//   payload: items,
// });

// export const fetchToDosFailure = (error) => ({
//   type: FETCH_TODOS_FAILURE,
//   payload: { error },
// });

// export const removeToDo = (id) => ({ type: REMOVE_TODO_START, payload: id });

// export const removeToDoSuccess = (id) => ({
//   type: REMOVE_TODO_SUCCESS,
//   payload: id,
// });

// export const removeToDoFailure = (error) => ({
//   type: REMOVE_TODO_FAILURE,
//   payload: error,
// });

export const updateToDo = ({ id, field, value }) => ({
  type: UPDATE_TODO_START,
  payload: { id, field, value },
})

export const updateToDoSuccess = ({ _id, field, value }) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: { _id, field, value },
});

export const updateToDoFailure = (error) => ({
  type: UPDATE_TODO_FAILURE,
  payload: error
})

export const applyFilter = (item) => ({ type: ADD_FILTER, payload: item });

export const removeFilter = (item) => ({ type: REMOVE_FILTER, payload: item });

export const updateSorts = (field) => ({ type: UPDATE_SORTS, payload: field });
