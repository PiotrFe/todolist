import { all, call } from "redux-saga/effects";

import { filterBarSagas } from "./filter-bar/filter-bar.sagas";
import { todoListsContainerSaga } from "./todo-lists-container/todo-lists-container.sagas";
import { signInSignUpSaga } from "./sign-in-sign-up-page/sign-in-sign-up-page.sagas";

export default function* rootSaga() {
  yield all([
    call(filterBarSagas),
    call(todoListsContainerSaga),
    call(signInSignUpSaga)
  ]);
}
