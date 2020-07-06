import { all, call } from "redux-saga/effects";

import { todoContainerSagas } from "./todo-container/todo-container.sagas";
import { filterBarSagas } from "./filter-bar/filter-bar.sagas";
import { todoListsContainerSaga } from "./todo-lists-container/todo-lists-container.sagas";

export default function* rootSaga() {
  yield all([call(todoContainerSagas), call(filterBarSagas), call(todoListsContainerSaga)]);
}
