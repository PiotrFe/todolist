import { ToDoListsActionTypes } from "../todo-lists-container/todo-lists-container.types";
import { FilterBarTypes } from "../filter-bar/filter-bar.types";
import { DEFAULT_SORTS } from "../../constants/constants";

const {
  ADD_LIST_SUCCESS,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
} = ToDoListsActionTypes;
const {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
} = FilterBarTypes;

const INITIAL_STATE = {
  byID: {},
  allIDs: [],
  error: "",
};

const getListData = (list) => {
  return {
    title: list.title,
    todos: list.todos.map(({ _id }) => _id),
  };
};

const updateViewOnFilterChange = ({ filters = [], currentIDs, newItemIDs }) => {
  if (filters.length === 0) return newItemIDs;
  else
    return [
      ...currentIDs,
      ...newItemIDs.filter((id) => !currentIDs.includes(id)),
    ];
};

// let listID = "", todoID = "", todo = {};

const ToDoListsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        byID: action.payload.reduce((obj, list) => {
          const ids = list.todos.map((item) => item._id);
          return {
            ...obj,
            [list._id]: {
              filters: [],
              sorts: DEFAULT_SORTS,
              todos: ids,
              title: list.title,
              localView: ids,
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
      const { listID, filters, todos } = action.payload;
      const newItemIDs = todos.map(({ _id }) => _id);

      return {
        ...state,
        byID: {
          ...state.byID,
          [listID]: {
            ...state.byID[listID],
            filters: filters,
            todos: updateViewOnFilterChange({
              filters,
              currentIDs: state.byID[listID].todos,
              newItemIDs,
            }),
            localView: newItemIDs,
            sorts: action.payload.sorts,
          },
        },
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: {
            ...state.byID[action.payload.listID],
            todos: [...state.byID[action.payload.listID].todos, action.payload.todo._id],
            localView: [...state.byID[action.payload.listID].localView, action.payload.todo._id]
          },
        },
      };

    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE_TODO_SUCCESS:
      debugger;
      const currentIDsAll = state.byID[action.payload.listID].todos;
      const currentIDsVisible = state.byID[action.payload.listID].localView;
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: {
            ...state.byID[action.payload.listID],
            todos: currentIDsAll.filter((id) => id !== action.payload.todoID),
            localView: currentIDsVisible.filter(id => id !== action.payload.todoID)
          },
        },
      };

    case REMOVE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_LIST_SUCCESS:
      const { _id } = action.payload;
      return {
        ...state,
        allIDs: [...state.allIDs, action.payload._id],
        byID: {
          ...state.byID,
          [_id]: getListData(action.payload),
        },
      };

    case FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS:
      const filteredDataPerListID = action.payload.data.reduce(
        (agg, list) => ({
          ...agg,
          [list._id]: getListData(list),
        }),
        {}
      );

      const stateWithUpdatedItemIDs = Object.entries(state.byID).reduce(
        (acc, [id, data]) => {
          return {
            ...acc,
            [id]: {
              ...data,
              todos: updateViewOnFilterChange({
                currentIDs: data.todos,
                newItemIDs: filteredDataPerListID[id].todos,
                filters: action.payload.filters,
              }),
            },
          };
        },
        {}
      );

      return {
        ...state,
        byID: {
          ...state.byID,
          ...stateWithUpdatedItemIDs,
        },
      };

    default:
      return state;
  }
};

export default ToDoListsReducer;
