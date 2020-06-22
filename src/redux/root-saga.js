import { all, call} from 'redux-saga/effects';

import {todoContainerSagas} from "./todo-container/todo-container.sagas";

export default function* rootSaga() {
    yield all([call(todoContainerSagas)])
}