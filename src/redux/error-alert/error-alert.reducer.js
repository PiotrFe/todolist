import { ErrorAlertTypes } from "./error-alert.types";

const INITIAL_STATE = {};

const ErrorAlertReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ErrorAlertTypes.SHOW_ALERT:
      return {
        ...state,
        ...payload,
      };
    case ErrorAlertTypes.CLEAR_ALERT:
      const copyState = Object.assign({}, state);
      delete copyState[payload];

      return {
        ...copyState,
      };
    default:
      return state;
  }
};

export default ErrorAlertReducer;
