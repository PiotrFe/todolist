import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import FormButton from "../form-button/form-button.component";

import "./sign-in.styles.scss";

const SignIn = ({ onSubmit }) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <div className="sign-in">
      <h2 className="sign-in-header">I already have an account</h2>
      <p className="sign-in-para">Sign in with your email and password</p>

      <form
        className="sign-in-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormInput
          label="email"
          type="email"
          value={email}
          handleChange={updateEmail}
        />
        <FormInput
          label="password"
          type="password"
          value={password}
          handleChange={updatePassword}
        />
        <div className="sign-in__button-group">
          <FormButton
            text="Sign in"
            onClick={() => onSubmit({ email, password })}
          />
          <FormButton
            text="Sign in with Google"
            isGoogle={true}
            onClick={null}
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
