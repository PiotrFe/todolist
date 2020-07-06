import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import logger from 'redux-logger'

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleWare, logger));

sagaMiddleWare.run(rootSaga);

export default store;
