import { FilterTypes } from "./filter.types";

const { ADD_FILTER, REMOVE_FILTER, CLEAR_FILTERS } = FilterTypes;

const INITIAL_STATE = {
  byID: {},
};

const returnArr = (obj) => {
  if (Array.isArray(obj)) {
    return obj;
  } else return [];
};

const FiltersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: [
            ...returnArr(state.byID[action.payload.listID]),
            action.payload.filter,
          ],
        },
      };

    case REMOVE_FILTER:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.listID]: state.byID[action.payload.listID].filter(
            (item) => {
              let [key, value] = Object.entries(item)[0];
              return (
                JSON.stringify({ [key]: value }) !==
                JSON.stringify(action.payload.filter)
              );
            }
          ),
        },
      };

    case CLEAR_FILTERS:
      const { listID } = action.payload;
      const { [listID]: deleted, ...remainingFilters } = state.byID;

      return {
        ...state,
        byID: {
          ...remainingFilters,
        },
      };
    default:
      return state;
  }
};

export default FiltersReducer;
