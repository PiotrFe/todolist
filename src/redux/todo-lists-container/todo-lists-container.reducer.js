import { ToDoListsActionTypes } from "./todo-lists-container.types";

const {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
} = ToDoListsActionTypes;

const INITIAL_STATE = {
  todoLists: [],
  loading: false,
  error: null,
};

const TodoListsContainerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        todoLists: action.payload,
      };

    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default TodoListsContainerReducer;
