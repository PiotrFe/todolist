import { ToDosActiontypes } from "./todo-container.types";

const {
  ADD_TODO,
  ADD_FILTER,
  ASYNC_ACTION_BEGIN,
  DROP_TODO,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_FILTER,
  REMOVE_TODO,
  UPDATE_SORTS,
  UPDATE_TODO,
} = ToDosActiontypes;

export const addToDo = (item) => ({ type: ADD_TODO, payload: item });

export const asyncActionBegin = () => ({ type: ASYNC_ACTION_BEGIN });

export const dropToDo = (idxFrom, idxTo) => ({type: DROP_TODO, payload: {idxFrom, idxTo}});

export const fetchToDosSuccess = (items) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: items,
});

export const fetchToDosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: { error },
});

export const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id });

export const updateTodo = ({_id, field, value}) => ({ type: UPDATE_TODO, payload: {_id, field, value}});

export const applyFilter = (item) => ({type: ADD_FILTER, payload: item});

export const removeFilter = (item) => ({type: REMOVE_FILTER, payload: item});

export const updateSorts = (field) => ({ type: UPDATE_SORTS, payload: field})
