import { ToDoListsActionTypes } from "../todo-lists-container/todo-lists-container.types";
import { ToDoItemTypes } from "../todo-item/todo-item.types";
import { FilterBarTypes } from "../filter-bar/filter-bar.types";

const {
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  REMOVE_LIST_SUCCESS,
  REPLACE_TODO_SUCCESS,
  REPLACE_TODO_FAILURE
} = ToDoListsActionTypes;
const { UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE } = ToDoItemTypes;
const {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
} = FilterBarTypes;

const INITIAL_STATE = {
  byID: {},
  error: "",
};

const createToDoObj = (todo) => ({
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
});

const extractToDosFromLists = (lists) => {
  const updatedToDos = lists.reduce((agg, list) => {
    const todosFromList = list.todos.reduce(
      (obj, todo) => ({
        ...obj,
        [todo._id]: createToDoObj(todo),
      }),
      {}
    );

    return {
      ...agg,
      ...todosFromList,
    };
  }, {});

  return updatedToDos;
};

const filterToDosByListID = ({todos, listID}) => {
  let updatedToDoList = {};
  
  for (const todoID in todos) {
    const todo = todos[todoID];
    if (!todo.lists.includes(listID)) {
      updatedToDoList = {
        ...updatedToDoList,
        [todoID]: todo
      };
    }
  }

  return updatedToDoList;
}

const TodoItemsReducer = (state = INITIAL_STATE, action) => {
  let listID, todoID, todo, field, value;

  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        byID: action.payload.reduce((listObj, list) => {
          const todos = list.todos.reduce((todoObj, todo) => {
            return {
              ...todoObj,
              [todo._id]: createToDoObj(todo),
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

    case FETCH_TODOS_SUCCESS:
      const newToDosObj = action.payload.todos.reduce((todoObj, todo) => {
        return {
          ...todoObj,
          [todo._id]: createToDoObj(todo),
        };
      }, {});
      return {
        ...state,
        byID: {
          ...state.byID,
          ...newToDosObj,
        },
      };

    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_TODO_SUCCESS:
      ({ todoID, field, value } = action.payload);
      return {
        ...state,
        byID: {
          ...state.byID,
          [todoID]: {
            ...state.byID[todoID],
            [field]: value,
          },
        },
      };
    case UPDATE_TODO_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_TODO_SUCCESS: {
      ({ todo } = action.payload);
      return {
        ...state,
        byID: {
          ...state.byID,
          [todo._id]: createToDoObj(todo),
        },
      };
    }
    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE_TODO_SUCCESS:
      ({ todoID } = action.payload);
      const { [todoID]: idToDelete, ...idsToKeep } = state.byID;

      return {
        ...state,
        byID: idsToKeep,
      };

    case REMOVE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS:
      return {
        ...state,
        byID: {
          ...state.byID,
          ...extractToDosFromLists(action.payload.data),
        },
      };

    case REMOVE_LIST_SUCCESS:
      return {
        ...state,
        byID: filterToDosByListID({todos: state.byID, listID: action.payload})
      };

      case UPDATE_TODO_SUCCESS: 
        return {
          ...state,
          byID: {
            ...state.byID,
            [action.payload.todoID]: {
              ...state.byID[action.payload.todoID],
              [action.payload.field]: [action.payload.value]
            }
          }
        }

      case UPDATE_TODO_FAILURE:
        return {
          ...state,
          error: action.payload
        }

      case REPLACE_TODO_SUCCESS:
        return {
          ...state,
          byID: {
            ...state.byID,
            [action.payload.todo._id]: createToDoObj(action.payload.todo)
        }
      }

      case REPLACE_TODO_FAILURE:
        return {
          ...state,
          error: action.payload
        }

    default:
      return state;
  }
};

export default TodoItemsReducer;
