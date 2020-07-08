import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";

import { ToDoListsActionTypes } from "./todo-lists-container.types";
import {
  asyncActionStart,
  fetchListsSuccess,
  fetchListsFailure,
  addToDoSuccess,
  addToDoFailure,
  removeToDoSuccess,
  removeToDoFailure,
  updateToDoSuccess,
  updateToDoFailure,
} from "./todo-lists-container.actions";

export function* fetchLists() {
  yield put(asyncActionStart());
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

export function* addToDo({ payload: { listID, todo } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, todo }),
    });

    const json = yield res.json();
    yield put(addToDoSuccess({ listID: json.listID, todo: json.todo }));
  } catch (error) {
    yield put(addToDoFailure(error));
  }
}

export function* removeToDo({ payload: { listID, todoID } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch(`/api/todos/${listID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, todoID }),
    });

    const json = yield res.json();
    yield put(removeToDoSuccess({ listID: json.listID, todoID: json.todoID }));
  } catch (error) {
    yield put(removeToDoFailure(error));
  }
}

export function* updateToDo({ payload: { todoID, field, value } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch(`/api/todos/${todoID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoID, field, value }),
    });

    const json = yield res.json();
    yield put(
      updateToDoSuccess({
        todoID: json.todoID,
        field: json.field,
        value: json.value,
      })
    );
  } catch (error) {
    yield put(updateToDoFailure(error));
  }
}

export function* onFetchLists() {
  yield takeLatest(ToDoListsActionTypes.FETCH_LISTS_START, fetchLists);
}

export function* onToDoAdd() {
  yield takeLatest(ToDoListsActionTypes.ADD_TODO_START, addToDo);
}

export function* onToDoRemove() {
  yield takeLatest(ToDoListsActionTypes.REMOVE_TODO_START, removeToDo);
}

export function* onToDoUpdate() {
  yield takeLatest(ToDoListsActionTypes.UPDATE_TODO_START, updateToDo);
}

export function* todoListsContainerSaga() {
  yield all([
    call(onFetchLists),
    call(onToDoAdd),
    call(onToDoRemove),
    call(onToDoUpdate),
  ]);
}
