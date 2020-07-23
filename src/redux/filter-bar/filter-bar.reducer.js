import { FilterBarTypes } from "./filter-bar.types";

const {
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
  CLEAR_FILTER_PREVIEW,
  SET_PREVIEW_LOADING
} = FilterBarTypes;

const INITIAL_STATE = {};

const FilterBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PREVIEW_LOADING:
      return {
        ...state,
        [action.payload.listID]: {
          ...state[action.payload.listID],
          loading: true,
        },
      };
    case FETCH_FILTER_PREVIEW_SUCCESS:
      return {
        ...state,
        [action.payload.listID]: {
          loading: false,
          preview: action.payload.data,
        },
      };
    case FETCH_FILTER_PREVIEW_FAILURE:
      return {
        ...state,
        [action.payload.listID]: {
          loading: false,
          preview: action.payload.error,
        },
      };
    case CLEAR_FILTER_PREVIEW:
      return {
        ...state,
        [action.payload.listID]: { loading: false, preview: [] },
      };
    default:
      return state;
  }
};

export default FilterBarReducer;
