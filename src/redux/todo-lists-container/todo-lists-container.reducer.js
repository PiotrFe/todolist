import { ToDoListsActionTypes } from "./todo-lists-container.types";

const {
  ASYNC_ACTION_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
} = ToDoListsActionTypes;

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
        loading: true
      }
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
          }
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
        todoLists: state.todoLists.map((list) => {
          return {
            ...list,
            todos: list.todos.map((item) => {
              if (item._id != action.payload.todoID) return item;
              else {
                return {
                  ...item,
                  [action.payload.field]: action.payload.value,
                };
              }
            }),
          };
        }),
      };

    case UPDATE_TODO_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default TodoListsContainerReducer;
