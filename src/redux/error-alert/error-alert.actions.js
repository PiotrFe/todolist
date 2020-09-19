import { ErrorAlertTypes } from "./error-alert.types";

const { SHOW_ALERT, HIDE_ALERT, CLEAR_ALERT } = ErrorAlertTypes;

export const showAlert = (message) => ({
  type: SHOW_ALERT,
  payload: message,
});

export const hideAlert = () => ({
  type: HIDE_ALERT,
});

export const clearAlert = (id) => ({
  type: CLEAR_ALERT,
  payload: id
});
