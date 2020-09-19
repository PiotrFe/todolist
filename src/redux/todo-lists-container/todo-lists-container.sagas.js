import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";

import { ToDoListsActionTypes } from "./todo-lists-container.types";

import { handleServerErrors } from "../../utils/utils";

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
  addListSuccess,
  addListFailure,
  removeListSuccess,
  removeListFailure,
  replaceToDoSuccess,
  replaceToDoFailure,
} from "./todo-lists-container.actions";

import { showAlert } from "../error-alert/error-alert.actions";

function* generateAlert(error, logout = false) {
  yield put(showAlert({ [Date.now()]: { error, logout } }));
}

function* fetchLists() {
  yield put(asyncActionStart());
  try {
    const response = yield fetch("/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield handleServerErrors(response);

    const data = yield response.json();
    yield put(fetchListsSuccess(data));
  } catch (error) {
    yield put(fetchListsFailure(error));
    yield generateAlert(error.message, true);
  }
}

function* addToDo({ payload: { listID, todo } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, todo }),
    });

    yield handleServerErrors(res);

    const json = yield res.json();
    yield put(addToDoSuccess({ listID: json.listID, todo: json.todo }));
  } catch (error) {
    yield put(addToDoFailure(error));
    yield generateAlert(error.message, false);
  }
}

function* removeToDo({ payload: { listID, todoID } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch(`/api/todos/${listID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listID, todoID }),
    });

    yield handleServerErrors(res);

    const json = yield res.json();
    yield put(removeToDoSuccess({ listID: json.listID, todoID: json.todoID }));
  } catch (error) {
    yield put(removeToDoFailure(error));
    yield generateAlert(error.message, false);
  }
}

function* updateTodoField({ payload: { todoID, field, value } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch(`/api/todos/${todoID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoID, field, value }),
    });
    yield handleServerErrors(res);

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
    yield generateAlert(error.message, false);
  }
}

function* addList({ payload: { title } }) {
  yield put(asyncActionStart());
  try {
    const res = yield fetch("api/todos/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    yield handleServerErrors(res);

    const list = yield res.json();

    yield put(addListSuccess(list));
  } catch (error) {
    yield put(addListFailure(error));
    yield generateAlert(error.message, false);
  }
}

function* removeList({ payload: listID }) {
  yield put(asyncActionStart());

  try {
    const res = yield fetch(`api/todos/lists/${listID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield handleServerErrors(res);

    const deletedListID = yield res.json();

    yield put(removeListSuccess(deletedListID));
  } catch (error) {
    yield put(removeListFailure(error));
    yield generateAlert(error.message, false);
  }
}

function* replaceToDo({ payload: { listID, todo } }) {
  yield put(asyncActionStart());

  try {
    const res = yield fetch(`api/todos/${listID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    
    yield handleServerErrors(res);

    const updatedToDo = yield res.json();

    yield put(replaceToDoSuccess({ todo: updatedToDo }));
  } catch (error) {
    yield put(replaceToDoFailure({ error }));
    yield generateAlert(error.message, false);
  }
}

function* onFetchLists() {
  yield takeLatest(ToDoListsActionTypes.FETCH_LISTS_START, fetchLists);
}

function* onToDoAdd() {
  yield takeLatest(ToDoListsActionTypes.ADD_TODO_START, addToDo);
}

function* onToDoRemove() {
  yield takeLatest(ToDoListsActionTypes.REMOVE_TODO_START, removeToDo);
}

function* onToDoUpdate() {
  yield takeLatest(ToDoListsActionTypes.UPDATE_TODO_START, updateTodoField);
}

function* onAddList() {
  yield takeLatest(ToDoListsActionTypes.ADD_LIST_START, addList);
}

function* onRemoveList() {
  yield takeLatest(ToDoListsActionTypes.REMOVE_LIST_START, removeList);
}

function* onToDoReplace() {
  yield takeLatest(ToDoListsActionTypes.REPLACE_TODO_START, replaceToDo);
}

export function* todoListsContainerSaga() {
  yield all([
    call(onFetchLists),
    call(onToDoAdd),
    call(onToDoRemove),
    call(onToDoUpdate),
    call(onAddList),
    call(onRemoveList),
    call(onToDoReplace),
  ]);
}
