import { ToDoListsActionTypes } from "../todo-lists-container/todo-lists-container.types";
import { FilterBarTypes } from "../filter-bar/filter-bar.types";
import { DEFAULT_SORTS } from "../../constants/constants";

const {
  ADD_LIST_SUCCESS,
  REMOVE_LIST_SUCCESS,
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

const createListObject = (list) => {
  const ids = list.todos.map(({ _id }) => _id);
  return {
    title: list.title,
    allItems: ids,
    itemsFilteredLocally: ids,
    itemsFilteredGlobally: ids,
    visibleItems: ids,
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
              allItems: ids,
              title: list.title,
              itemsFilteredLocally: ids,
              itemsFilteredGlobally: ids,
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
            allItems: updateViewOnFilterChange({
              filters,
              currentIDs: state.byID[listID].allItems,
              newItemIDs,
            }),
            itemsFilteredLocally: newItemIDs,
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
            allItems: [
              ...state.byID[action.payload.listID].allItems,
              action.payload.todo._id,
            ],
            itemsFilteredLocally: [
              ...state.byID[action.payload.listID].itemsFilteredLocally,
              action.payload.todo._id,
            ],
            itemsFilteredGlobally: [
              ...state.byID[action.payload.listID].itemsFilteredGlobally,
              action.payload.todo._id,
            ],
          },
        },
      };

    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE_TODO_SUCCESS:
      const currentIDsAll = state.byID[action.payload.listID].allItems;
      const currentIDsFilteredLocally = state.byID[action.payload.listID].itemsFilteredLocally;
      const currentIDsFilteredGlobally = state.byID[action.payload.listID].itemsFilteredGlobally;
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: {
            ...state.byID[action.payload.listID],
            allItems: currentIDsAll.filter(
              (id) => id !== action.payload.todoID
            ),
            itemsFilteredLocally: currentIDsFilteredLocally.filter(
              (id) => id !== action.payload.todoID
            ),
            itemsFilteredGlobally: currentIDsFilteredGlobally.filter(
              (id) => id !== action.payload.todoID
            ),
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
          [_id]: createListObject(action.payload),
        },
      };

    case REMOVE_LIST_SUCCESS:
      const removedListID = action.payload;
      const { [removedListID]: deleted, ...remainingLists } = state.byID;

      return {
        ...state,
        allIDs: state.allIDs.filter((id) => id !== removedListID),
        byID: {
          ...remainingLists,
        },
      };

    case FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS:
      const filteredDataPerListID = action.payload.data.reduce(
        (agg, list) => ({
          ...agg,
          [list._id]: createListObject(list),
        }),
        {}
      );

      const stateWithUpdatedItemIDs = Object.entries(state.byID).reduce(
        (acc, [id, data]) => {
          return {
            ...acc,
            [id]: {
              ...data,
              allItems: updateViewOnFilterChange({
                currentIDs: data.allItems,
                newItemIDs: filteredDataPerListID[id].allItems,
                filters: action.payload.filters,
              }),
              itemsFilteredGlobally: filteredDataPerListID[id].allItems,
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
