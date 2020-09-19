import { takeLatest, take, put, call, all } from "redux-saga/effects";
import { FilterBarTypes } from "./filter-bar.types";

import {
  fetchFilteredToDosMainInputSuccess,
  fetchFilteredToDosMainInputFailure,
  clearFilterPreview,
  fetchToDoSSuccess,
  fetchToDoSFailure,
  showFilterPreviewSuccess,
  showFilterPreviewFailure,
  setPreviewLoading,
} from "./filter-bar.actions";

import { showAlert } from "../error-alert/error-alert.actions";

import { fetchListsSuccess } from "../../redux/todo-lists-container/todo-lists-container.actions";

import { asyncActionStart } from "../todo-lists-container/todo-lists-container.actions";
import { MAIN_INPUT_ID } from "../../constants/constants";

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

    yield put(showFilterPreviewSuccess({ listID, data }));
  } catch (error) {
    yield put(showFilterPreviewFailure({ listID, error }));
  }
}

export function* fetchFilteredToDos({ payload: { listID, filters, sorts } }) {
  yield put(asyncActionStart());
  yield put(clearFilterPreview(listID));

  try {
    const data = yield fetch("/api/todos/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, filters, sorts }),
    });

    const json = yield data.json();

    if (listID === MAIN_INPUT_ID) {
      yield put(fetchFilteredToDosMainInputSuccess({ data: json, filters }));
    } else {
      yield put(fetchToDoSSuccess({ listID, todos: json, filters, sorts }));
    }
  } catch (error) {
    if (listID === MAIN_INPUT_ID) {
      yield put(fetchFilteredToDosMainInputFailure({ error }));
    } else {
      yield put(fetchToDoSFailure({ listID, error }));
    }
  }
}

export function* onShowPreviewStart() {
  yield takeLatest(FilterBarTypes.FETCH_FILTER_PREVIEW_START, fetchPreview);
}

export function* onFetchFilteredToDos() {
  yield takeLatest(FilterBarTypes.FETCH_TODOS_START, fetchFilteredToDos);
}

export function* filterBarSagas() {
  yield all([call(onShowPreviewStart), call(onFetchFilteredToDos)]);
}
