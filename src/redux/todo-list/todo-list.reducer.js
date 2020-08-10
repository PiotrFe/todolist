import { ToDoListTypes } from "./todo-list.types";
import { FilterBarTypes } from "../filter-bar/filter-bar.types";
import { DEFAULT_SORTS } from "../../constants/constants";

const { FETCH_LISTS_SUCCESS, FETCH_LISTS_FAILURE } = ToDoListTypes;
const { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } = FilterBarTypes;

const INITIAL_STATE = {
  byID: {},
  allIDs: [],
  error: "",
};

const ToDoListsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        byID: action.payload.reduce((obj, list) => {
          return {
            ...obj,
            [list._id]: {
              filters: [],
              sorts: DEFAULT_SORTS,
              todos: list.todos.map((item) => item._id),
              title: list.title,
            },
          };
        }, {}),
        allIDs: action.payload.map((list) => list._id),
      };
    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: {
            filters: action.payload.filters,
            todos: action.payload.todos.map(({ _id }) => _id),
            sorts: action.payload.sorts,
          },
        },
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default ToDoListsReducer;
