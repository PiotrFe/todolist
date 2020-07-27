import { FilterBarTypes } from "./filter-bar.types";

import { MAIN_INPUT_ID } from "../../constants/constants";

const {
  SET_FILTERS_AND_PREVIEW_STORE,
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
  CLEAR_FILTER_PREVIEW,
  SET_PREVIEW_LOADING,
  ADD_FILTER,
  REMOVE_FILTER,
  FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
  FETCH_FILTERED_TODOS_MAIN_INPUT_FAILURE,
} = FilterBarTypes;


const INITIAL_STATE = {};

const FilterBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTERS_AND_PREVIEW_STORE:
      return {
        ...state,
        [action.payload.listID]: {
          loading: false,
          filters: [],
          preview: {},
        },
      };
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
          ...state[action.payload.listID],
          loading: false,
          preview: action.payload.data,
        },
      };
    case FETCH_FILTER_PREVIEW_FAILURE:
      return {
        ...state,
        [action.payload.listID]: {
          ...state[action.payload.listID],
          loading: false,
          preview: action.payload.error,
        },
      };
    case CLEAR_FILTER_PREVIEW:
      return {
        ...state,
        [action.payload.listID]: {
          ...state[action.payload.listID],
          loading: false,
          preview: [],
        },
      };
    case ADD_FILTER:
      return {
        ...state,
        [action.payload.listID]: {
          ...state[action.payload.listID],
          loading: false,
          filters: [
            ...state[action.payload.listID].filters,
            action.payload.filter,
          ],
        },
      };
    case REMOVE_FILTER:
      return {
        ...state,
        [action.payload.listID]: {
          ...state[action.payload.listID],
          loading: false,
          filters: state[action.payload.listID].filters.filter(
            (item) =>
              JSON.stringify(item) !== JSON.stringify(action.payload.filter)
          ),
        },
      };
    case FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS:
      return {
        ...state,
        [MAIN_INPUT_ID]: {
          ...state[MAIN_INPUT_ID],
          todoData: action.payload.todos,
        },
      };
    default:
      return state;
  }
};

export default FilterBarReducer;
