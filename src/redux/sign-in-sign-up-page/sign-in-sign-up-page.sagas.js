import { all, call, put, takeLatest } from "redux-saga/effects";
import { SignInSignUpTypes } from "./sign-in-sign-up-page.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from "./sign-in-sign-up-page.actions";

function* signIn({ payload: { email, password, callback } }) {
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
      callback();
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

function* onSignIn() {
  yield takeLatest(SignInSignUpTypes.SIGN_IN_START, signIn);
}

function* onSignOut() {
  yield takeLatest(SignInSignUpTypes.SIGN_OUT_START, signOut);
}

export function* signInSignUpSaga() {
  yield all([call(onSignIn), call(onSignOut)]);
}
