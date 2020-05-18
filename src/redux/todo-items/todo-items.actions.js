import { ToDoActiontypes } from "./todo-items.types";

const {
  ADD_TODO,
  FETCH_TODOS_BEGIN,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} = ToDoActiontypes;

export const addToDo = (payload) => ({ type: ADD_TODO, payload });

export const fetchToDosBegin = () => ({ type: FETCH_TODOS_BEGIN });

export const fetchToDosSuccess = (items) => {
    console.log("In items reducer");
    console.log(JSON.stringify(items));
    // debugger;
    return  ({
        type: FETCH_TODOS_SUCCESS,
        payload: items,
      });
}

export const fetchToDosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: { error },
});
