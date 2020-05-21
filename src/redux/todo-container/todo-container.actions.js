import { ToDosActiontypes } from "./todo-container.types";

const {
  ADD_TODO,
  ASYNC_ACTION_BEGIN,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_TODO,
  UPDATE_TODO,
} = ToDosActiontypes;

export const addToDo = (item) => ({ type: ADD_TODO, payload: item });

export const asyncActionBegin = () => ({ type: ASYNC_ACTION_BEGIN });

export const fetchToDosSuccess = (items) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: items,
});

export const fetchToDosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: { error },
});

export const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id });

export const updateTodo = (todoEntry) => ({ type: UPDATE_TODO, payload: todoEntry});
