import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import { selectAuthStatus } from "../../redux/sign-in-sign-up-page/sign-in-sign-up-page.selectors";

import nav from "../../nav";

import {
  signInStart,
  signUpStart,
  checkSessionStart,
} from "../../redux/sign-in-sign-up-page/sign-in-sign-up-page.actions";

import "./SignInAndSignUp.styles.scss";

const SignInAndSignUp = ({ authenticated, signIn, signUp, checkSession }) => {
  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (authenticated) nav("/app");
  }, [authenticated]);

  return (
    <div className="sign-in-and-sign-up">
      <SignIn
        onSubmit={({ email, password }) => {
          signIn({ email, password });
        }}
      />
      <SignUp
        onSubmit={({ email, password }) => {
          signUp({ email, password });
        }}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthStatus,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: ({ email, password }) => dispatch(signInStart({ email, password })),
  signUp: ({ email, password }) => dispatch(signUpStart({ email, password })),
  checkSession: () => dispatch(checkSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInAndSignUp);
