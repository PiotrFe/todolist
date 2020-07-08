import { all, call } from "redux-saga/effects";

import { filterBarSagas } from "./filter-bar/filter-bar.sagas";
import { todoListsContainerSaga } from "./todo-lists-container/todo-lists-container.sagas";

export default function* rootSaga() {
  yield all([call(filterBarSagas), call(todoListsContainerSaga)]);
}
