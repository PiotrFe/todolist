import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";

import { ToDoListsActionTypes } from "./todo-lists-container.types";
import { fetchListsSuccess, fetchListsFailure } from "./todo-lists-container.actions";


export function* fetchLists() {
    try {
        const data = yield fetch("/api/todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const todoLists = yield data.json();

        yield put(fetchListsSuccess(todoLists));
        
      } catch (error) {
        yield put(fetchListsFailure(error));
      }
}

export function* onFetchListsStart() {
    yield takeLatest(ToDoListsActionTypes.FETCH_LISTS_START, fetchLists);
}

export function* todoListsContainerSaga() {
    yield all([
        onFetchListsStart()
    ])
}