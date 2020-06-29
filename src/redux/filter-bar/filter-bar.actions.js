import { FilterBarTypes } from "./filter-bar.types";

const {FETCH_FILTER_PREVIEW_START, FETCH_FILTER_PREVIEW_SUCCESS, FETCH_FILTER_PREVIEW_FAILURE} = FilterBarTypes;

export const showFilterPreview = word => ({
    type: FETCH_FILTER_PREVIEW_START,
    payload: word
})

export const showFilterPreviewSuccess = preview => ({
    type: FETCH_FILTER_PREVIEW_SUCCESS,
    payload: preview
})

export const showFilterPreviewFailure = error => ({
    type: FETCH_FILTER_PREVIEW_FAILURE,
    payload: error
})
