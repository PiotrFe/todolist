import { FilterBarTypes } from "./filter-bar.types";

const {
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
} = FilterBarTypes;

const INITIAL_STATE = {

};

const FilterBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FILTER_PREVIEW_SUCCESS:
      return {
        ...state,
        [action.payload.listID]: action.payload.data
      };
    case FETCH_FILTER_PREVIEW_FAILURE:
      return {
        ...state,
        [action.payload.listID]: action.payload.error
      };
    default:
      return state;
  }
};

export default FilterBarReducer;
