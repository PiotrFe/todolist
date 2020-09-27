import { FilterBarTypes } from "./filter-bar.types";

import { MAIN_INPUT_ID } from "../../constants/constants";

const {
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
  CLEAR_FILTER_PREVIEW,
  SET_PREVIEW_LOADING,
} = FilterBarTypes;

const INITIAL_STATE = {
  previewByListID: {},
};

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
            error: action.payload.error,
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
    default:
      return state;
  }
};

export default FilterBarReducer;
