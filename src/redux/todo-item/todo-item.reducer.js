import { ToDoListTypes } from "../todo-list/todo-list.types";
import { ToDoItemTypes } from "../todo-item/todo-item.types";
import { DEFAULT_SORTS } from "../../constants/constants";

const { FETCH_LISTS_SUCCESS, FETCH_LISTS_FAILURE } = ToDoListTypes;
const { UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE  } = ToDoItemTypes;

const INITIAL_STATE = {
  byID: {},
  error: "",
};

const TodoItemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        byID: action.payload.reduce((listObj, list) => {
          const todos = list.todos.reduce((todoObj, todo) => {
            return {
              ...todoObj,
              [todo._id]: {
                color: todo.color,
                details: todo.details,
                detailsDraft: todo.detailsDraft,
                detailsVisible: todo.detailsVisible,
                done: todo.done,
                draft: todo.draft,
                dueDate: todo.dueDate,
                lists: todo.lists,
                owner: todo.owner,
                title: todo.title,
              },
            };
          }, {});
          return {
            ...listObj,
            ...todos,
          };
        }, {}),
      };
    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      case UPDATE_TODO_SUCCESS:
        return {
          ...state,
          byID: {
              ...state.byID,
              [action.payload.todoID]: {
                  ...state.byID[action.payload.todoID],
                  [action.payload.field]: action.payload.value
              }
          }
        };
      case UPDATE_TODO_FAILURE: {
        return {
          ...state,
          error: action.payload,
        };
      }

    default:
      return state;
  }
};

export default TodoItemsReducer;
