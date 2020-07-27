import { take, takeLatest, put, call, all } from "redux-saga/effects";
import { TodoContainerTypes } from "./todo-container.types";

import { fetchToDoSSuccess, fetchToDoSFailure } from "./todo-container.actions";
import {
  fetchFilteredToDosMainInputSuccess,
  fetchFilteredToDosMainInputFailure,
} from "../filter-bar/filter-bar.actions";

import { asyncActionStart } from "../todo-lists-container/todo-lists-container.actions";
import { MAIN_INPUT_ID } from "../../constants/constants";

export function* fetchFilteredToDos({ payload: { listID, filters, sorts } }) {
  yield put(asyncActionStart());
  try {
    const data = yield fetch("/api/todos/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, filters, sorts }),
    });

    const todos = yield data.json();

    if (listID === MAIN_INPUT_ID) {
      yield put(fetchFilteredToDosMainInputSuccess({ todos }));
    } else {
      yield put(fetchToDoSSuccess({ listID, todos, filters, sorts }));
    }
  } catch (error) {
    if (listID === MAIN_INPUT_ID) {
      yield put(fetchFilteredToDosMainInputFailure({ error }));
    } else {
      yield put(fetchToDoSFailure({ listID, error }));
    }
  }
}

export function* onFetchFilteredToDos() {
  yield takeLatest(TodoContainerTypes.FETCH_TODOS_START, fetchFilteredToDos);
}

export function* todoContainerSaga() {
  yield all([call(onFetchFilteredToDos)]);
}
