import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import logger from 'redux-logger'

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare, logger));

sagaMiddleWare.run(rootSaga);

export default store;
