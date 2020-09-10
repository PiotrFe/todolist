import React from "react";
import { connect } from "react-redux";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import nav from "../../nav";

import { signInStart } from "../../redux/sign-in-sign-up-page/sign-in-sign-up-page.actions";

import "./SignInAndSignUp.styles.scss";

// https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components

const SignInAndSignUp = ({ signIn }) => (
  <div className="sign-in-and-sign-up">
    <SignIn
      onSubmit={({ email, password }) => {
        signIn({ email, password, callback: () => {
          nav("/app");
        } });
      }}
    />
    <SignUp />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  signIn: ({ email, password, callback }) => dispatch(signInStart({ email, password, callback })),
});

export default connect(null, mapDispatchToProps)(SignInAndSignUp);
