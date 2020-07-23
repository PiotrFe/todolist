import { FilterBarTypes } from "./filter-bar.types";

const {
  FETCH_FILTER_PREVIEW_START,
  FETCH_FILTER_PREVIEW_SUCCESS,
  FETCH_FILTER_PREVIEW_FAILURE,
  CLEAR_FILTER_PREVIEW,
  SET_PREVIEW_LOADING
} = FilterBarTypes;

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
  payload: {listID}
})

export const setPreviewLoading = listID => ({
  type: SET_PREVIEW_LOADING,
  payload: {listID}
})
