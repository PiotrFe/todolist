import { takeLatest, take, call, put, all } from "redux-saga/effects";

import {
  // fetchToDosSuccess,
  // fetchToDosFailure,
  // addToDoSuccess,
  // addToDoFailure,
  // removeToDoSuccess,
  // removeToDoFailure,
  updateToDoSuccess,
  updateToDoFailure,
} from "./todo-container.actions";
import { ToDosActiontypes } from "./todo-container.types";

import { selectSorts } from "./todo-container.selectors";





export function* updateToDo({payload: {id, field, value}}) {
  try {
    const res = yield fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, value }),
    });

    const data = yield res.json();
    yield put(updateToDoSuccess(data));
  } catch (error) {
    yield put(updateToDoFailure(error));
  }
}

export function* onToDoUpdate() {
  yield takeLatest(ToDosActiontypes.UPDATE_TODO_START, updateToDo);
}

export function* todoContainerSagas() {
  yield all([
    call(onToDoUpdate),
  ]);
}
