import { ToDoListsActionTypes } from "../todo-lists-container/todo-lists-container.types";
import { updateSorts } from "./sorts.utils";

const { UPDATE_SORTS } = ToDoListsActionTypes;
const INITIAL_STATE = {
  byID: {},
};

const SortsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SORTS:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: updateSorts(
            action.payload.sorts,
            action.payload.field
          ),
        },
      };
    default:
      return state;
  }
};

export default SortsReducer;
