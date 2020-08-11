import { FilterBarTypes } from "./filter-bar.types";

import { MAIN_INPUT_ID } from "../../constants/constants";

const {
  SET_FILTERS_AND_PREVIEW_STORE,
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
  CLEAR_FILTER_PREVIEW,
  SET_PREVIEW_LOADING,
  FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
  FETCH_FILTERED_TODOS_MAIN_INPUT_FAILURE,
} = FilterBarTypes;

const INITIAL_STATE = {
  previewByListID: {},
  globalFilteredData: [],
};

let key, value;

const FilterBarReducer = (state = INITIAL_STATE, action) => {
  let listID;

  switch (action.type) {
    case SET_PREVIEW_LOADING:
      ({listID} = action.payload);
      return {
        ...state,
        previewByListID: {
          ...state.previewByListID,
          [listID]: {
            ...state.previewByListID[listID],
            loading: true,
          },
        },
      };
    case FETCH_FILTER_PREVIEW_SUCCESS:
      ({listID} = action.payload);
      return {
        ...state,
        previewByListID: {
          ...state.previewByListID,
          [listID]: {
            ...state.previewByListID[listID],
            loading: false,
            preview: action.payload.data,
            error: "",
          },
        },
      };
    case FETCH_FILTER_PREVIEW_FAILURE:
      ({listID} = action.payload);
      return {
        ...state,
        previewByListID: {
          ...state.previewByListID,
          [listID]: {
            ...state.previewByListID[listID],
            loading: false,
            error: action.payload,
          },
        },
      };
    case CLEAR_FILTER_PREVIEW:
      ({listID} = action.payload);
      return {
        ...state,
        previewByListID: {
          ...state.previewByListID,
          [listID]: {
            ...state.previewByListID[listID],
            loading: false,
            error: "",
            preview: {},
          },
        },
      };
    case FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS:
      if (action.payload.filters.length === 0)
        return {
          ...state,
          globalFilteredData: [],
        };
      return {
        ...state,
        globalFilteredData: action.payload.todos.reduce((obj, filteredList) => {
          return {
            ...obj,
            [filteredList._id]: filteredList.todos
          }
        },{}),
      };
    default:
      return state;
  }
};

export default FilterBarReducer;
