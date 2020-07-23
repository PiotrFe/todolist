import { takeLatest, take, put, call, all } from "redux-saga/effects";
import { FilterBarTypes } from "./filter-bar.types";
import {
  showFilterPreviewSuccess,
  showFilterPreviewFailure,
  setPreviewLoading
} from "./filter-bar.actions";

export function* fetchPreview({ payload: { listID, filters, word } }) {

  yield put(setPreviewLoading(listID));

  try {
    const res = yield fetch(`api/todos/preview/${listID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, filters, keyword: word }),
    });

    const data = yield res.json();

    yield put(showFilterPreviewSuccess({listID, data}));
  } catch (error) {
    yield put(showFilterPreviewFailure({listID, error}));
  }
}

export function* onShowPreviewStart() {
  yield takeLatest(FilterBarTypes.FETCH_FILTER_PREVIEW_START, fetchPreview);
}

export function* filterBarSagas() {
  yield all([call(onShowPreviewStart)]);
}
