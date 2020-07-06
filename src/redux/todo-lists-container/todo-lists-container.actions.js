import { ToDoListsActionTypes } from "./todo-lists-container.types";

const {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
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
