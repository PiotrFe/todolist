import { SignInSignUpTypes } from "./sign-in-sign-up-page.types";

const {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  CHECK_SESSION_START
} = SignInSignUpTypes;

export const signInStart = ({ email, password, callback }) => ({
  type: SIGN_IN_START,
  payload: { email, password, callback },
});

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const signUpStart = ({ email, password, callback }) => ({
  type: SIGN_UP_START,
  payload: { email, password, callback },
});

export const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
});

export const signUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const signOutStart = (callback) => ({
  type: SIGN_OUT_START,
  payload: callback
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: SIGN_OUT_FAILURE,
  payload: error,
});

export const checkSessionStart = () => ({
  type: CHECK_SESSION_START
})