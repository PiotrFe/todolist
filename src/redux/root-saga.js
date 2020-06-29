import { all, call } from "redux-saga/effects";

import { todoContainerSagas } from "./todo-container/todo-container.sagas";
import { filterBarSagas } from "./filter-bar/filter-bar.sagas";

export default function* rootSaga() {
  yield all([call(todoContainerSagas), call(filterBarSagas)]);
}
