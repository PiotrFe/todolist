import { ToDoListsActionTypes } from "./todo-lists-container.types";

const {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
} = ToDoListsActionTypes;

export const fetchListsStart = () => ({
  type: FETCH_LISTS_START,
});

export const fetchLists = () => {
  return async (dispatch) => {
    try {
      const data = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const todoLists = await data.json();
      
      dispatch({
        type: FETCH_LISTS_SUCCESS,
        payload: todoLists,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LISTS_FAILURE,
        payload: error,
      });
    }
  };
};

export const fetchListsSuccess = (lists) => ({
  type: FETCH_LISTS_SUCCESS,
  payload: lists,
});

export const fetchListsFailure = (error) => ({
  type: FETCH_LISTS_FAILURE,
  payload: error,
});
