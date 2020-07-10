import { all, call } from "redux-saga/effects";

import { filterBarSagas } from "./filter-bar/filter-bar.sagas";
import { todoListsContainerSaga } from "./todo-lists-container/todo-lists-container.sagas";
import { todoContainerSaga } from "./todo-container/todo-container.sagas";

export default function* rootSaga() {
  yield all([
    call(filterBarSagas),
    call(todoListsContainerSaga),
    call(todoContainerSaga),
  ]);
}
