import { takeLatest, take, call, put, all } from "redux-saga/effects";

import {
  fetchToDosSuccess,
  fetchToDosFailure,
  addToDoSuccess,
  addToDoFailure,
  removeToDoSuccess,
  removeToDoFailure,
  updateToDoSuccess,
  updateToDoFailure,
} from "./todo-container.actions";
import { ToDosActiontypes } from "./todo-container.types";

import { selectSorts } from "./todo-container.selectors";


const items = [
      {
        _id: "5ebef0bcbaab894e2863e9b9",
        title: "Czwarty to-do",
        details: "More to do, even more to do!",
        draft: "",
        detailsDraft: "",
        owner: "Mario",
        dueDate: "2020-08-21T00:00:00.000Z",
        done: true,
        editMode: false,
        detailsVisible: false,
        color: "#F35B04",
        __v: 0.0,
      },


      {
        _id: "5ef101ee5e3ba74aa075748e",
        title: "okokoko",
        details: "",
        draft: "",
        detailsDraft: "",
        owner: "ookokk",
        dueDate: "2020-06-22T19:09:29.590Z",
        done: false,
        editMode: false,
        detailsVisible: false,
        color: "#F7B801",
        __v: 0.0,
      }
    ]

// export function* fetchCollection({ payload: { filters, sorts } }) {
//   try {
//     const res = yield fetch("/api/todos/filters", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ filters, sorts }),
//     });

//     const todos = yield res.json();
//     yield put(fetchToDosSuccess(todos));
//   } catch (error) {
//     yield put(fetchToDosFailure(error));
//   }
// }

export function* fetchCollection({ payload: {filters, sorts} }) {
  yield put(fetchToDosSuccess(items));

}

export function* addToDo({ payload }) {
  try {
    const res = yield fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const todo = yield res.json();
    yield put(addToDoSuccess(JSON.parse(todo)));
  } catch (error) {
    yield put(addToDoFailure(error));
  }
}

export function* removeToDo({ payload: id }) {
  try {
    const res = yield fetch(`/api/todos/${id}`, {
      method: "POST",
    });

    // const { _id } = yield res.json();
    const todo = yield res.json();
    yield put(removeToDoSuccess(todo._id));
  } catch (error) {
    yield put(removeToDoFailure(error));
  }
}

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

export function* onFetchCollection() {
  yield takeLatest(ToDosActiontypes.FETCH_TODOS_START, fetchCollection);
}

export function* onAddToDo() {
  yield takeLatest(ToDosActiontypes.ADD_TODO_START, addToDo);
}

export function* onRemoveToDo() {
  yield takeLatest(ToDosActiontypes.REMOVE_TODO_START, removeToDo);
}

export function* onToDoUpdate() {
  yield takeLatest(ToDosActiontypes.UPDATE_TODO_START, updateToDo);
}

export function* todoContainerSagas() {
  yield all([
    call(onFetchCollection),
    call(onAddToDo),
    call(onRemoveToDo),
    call(onToDoUpdate),
  ]);
}
