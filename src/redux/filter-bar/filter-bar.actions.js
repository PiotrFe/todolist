import { FilterBarTypes } from "./filter-bar.types";
import { FilterTypes } from "../filters/filter.types";

const {
  FETCH_FILTER_PREVIEW_START,
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
  CLEAR_FILTER_PREVIEW,
  SET_PREVIEW_LOADING,
  FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
  FETCH_FILTERED_TODOS_MAIN_INPUT_FAILURE,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} = FilterBarTypes;

const { ADD_FILTER, REMOVE_FILTER, CLEAR_FILTERS } = FilterTypes;

export const showFilterPreview = ({ listID, filters, word }) => ({
  type: FETCH_FILTER_PREVIEW_START,
  payload: { listID, filters, word },
});

export const showFilterPreviewSuccess = (preview) => ({
  type: FETCH_FILTER_PREVIEW_SUCCESS,
  payload: preview,
});

export const showFilterPreviewFailure = (error) => ({
  type: FETCH_FILTER_PREVIEW_FAILURE,
  payload: error,
});

export const clearFilterPreview = (listID) => ({
  type: CLEAR_FILTER_PREVIEW,
  payload: { listID },
});

export const setPreviewLoading = (listID) => ({
  type: SET_PREVIEW_LOADING,
  payload: { listID },
});

export const addFilter = ({ listID, filter }) => ({
  type: ADD_FILTER,
  payload: { listID, filter },
});

export const removeFilter = ({ listID, filter }) => ({
  type: REMOVE_FILTER,
  payload: { listID, filter },
});

export const clearFilters = ({ listID }) => ({
  type: CLEAR_FILTERS,
  payload: { listID },
});

export const fetchFilteredToDoS = ({ listID, filters, sorts }) => ({
  type: FETCH_TODOS_START,
  payload: { listID, filters, sorts },
});

export const fetchFilteredToDosMainInputSuccess = ({ data, filters }) => ({
  type: FETCH_FILTERED_TODOS_MAIN_INPUT_SUCCESS,
  payload: { data, filters },
});

export const fetchFilteredToDosMainInputFailure = ({ todos, error }) => ({
  type: FETCH_FILTERED_TODOS_MAIN_INPUT_FAILURE,
  payload: { todos, error },
});

export const fetchToDoSSuccess = ({
  listID,
  todos,
  filters = [],
  sorts = {},
}) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: { listID, todos, filters, sorts },
});

export const fetchToDoSFailure = ({ listID, error }) => ({
  type: FETCH_TODOS_FAILURE,
  payload: { listID, error },
});
