import { ToDoListsActionTypes } from "./todo-lists-container.types";
import { ToDoListTypes } from "../todo-list/todo-list.types";
import { FilterBarTypes } from "../filter-bar/filter-bar.types";
import { reorderItems } from "./todo-lists-container.utils";

const {
  ASYNC_ACTION_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  ADD_LIST_SUCCESS,
  ADD_LIST_FAILURE,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DROP_TODO,
} = ToDoListsActionTypes;

const {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} = ToDoListTypes;

const {
  FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
  FETCH_FILTERED_TODOS_MAIN_INPUT_FAILURE,
} = FilterBarTypes;

const INITIAL_STATE = {
  todoLists: [],
  loading: false,
  error: null,
};

const TodoListsContainerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        todoLists: action.payload.map((list) => list._id),
      };
    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoLists: state.todoLists.map((list) => {
          if (list._id === action.payload.listID) {
            return {
              ...list,
              todos: [...list.todos, action.payload.todo],
            };
          } else return list;
        }),
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case REMOVE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoLists: state.todoLists.map((list) => {
          if (list._id === action.payload.listID) {
            return {
              ...list,
              todos: list.todos.filter(
                (item) => item._id !== action.payload.todoID
              ),
            };
          }
          return list;
        }),
      };
    case REMOVE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TODO_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        todoLists: [{ ...action.payload }, ...state.todoLists],
      };
    case ADD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TODOS_SUCCESS:
    case FETCH_TODOS_FAILURE:
    case FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS:
    case FETCH_FILTERED_TODOS_MAIN_INPUT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case DROP_TODO:
      return {
        ...state,
        todoLists: state.todoLists.map((list) => {
          if (list._id === action.payload.listID) {
            return {
              ...list,
              todos: reorderItems(
                list.todos,
                action.payload.from,
                action.payload.to
              ),
            };
          }
          return list;
        }),
      };

    default:
      return state;
  }
};

export default TodoListsContainerReducer;
