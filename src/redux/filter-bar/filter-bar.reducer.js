import { FilterBarTypes } from "./filter-bar.types";

const {
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
} = FilterBarTypes;

const INITIAL_STATE = {
  filterPreview: [],
  error: null,
};

const FilterBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FILTER_PREVIEW_SUCCESS:
      return {
        ...state,
        filterPreview: action.payload,
      };
    case FETCH_FILTER_PREVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FilterBarReducer;
