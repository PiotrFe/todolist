import { all, call, put, takeLatest } from "redux-saga/effects";
import { SignInSignUpTypes } from "./sign-in-sign-up-page.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from "./sign-in-sign-up-page.actions";

function* signIn({ payload: { email, password } }) {
  try {
    const res = yield fetch("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const status = res.status;

    if (status === 200) {
      yield put(signInSuccess());
    } else {
      yield put(signInFailure(res.statusText));
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signOut({ payload: callback }) {
  try {
    const res = yield fetch("/auth/signout", {
      method: "POST",
    });

    if (res.status === 200) {
      callback();
      yield put(signOutSuccess());
    } else {
      yield put(signOutFailure());
    }
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

function* verifySession() {
  try {
    const res = yield fetch("/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      yield put(signInSuccess());
    } 
  } catch (error) {
    console.log(error);
  }
}

function* onSignIn() {
  yield takeLatest(SignInSignUpTypes.SIGN_IN_START, signIn);
}

function* onSignOut() {
  yield takeLatest(SignInSignUpTypes.SIGN_OUT_START, signOut);
}

function* onCheckSession() {
  yield takeLatest(SignInSignUpTypes.CHECK_SESSION_START, verifySession);
}

export function* signInSignUpSaga() {
  yield all([call(onSignIn), call(onSignOut), call(onCheckSession)]);
}
