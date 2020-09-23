import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import FormButton from "../form-button/form-button.component";

import "./sign-up.styles.scss";

const SignUp = ({ onSubmit }) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <div className="sign-up">
      <div className="sign-up__group">
        <h2 className="sign-up__header">I don't have an account</h2>
        <p className="sign-up__para">Use your email and password to register</p>
      </div>
      <form
        className="sign-up__form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="sign-up__group">
          <FormInput
            label="email"
            type="email"
            value={email}
            onChange={(event) => updateEmail(event.target.value)}
          />
          <FormInput
            label="password"
            type="password"
            value={password}
            onChange={(event) => updatePassword(event.target.value)}
          />
        </div>
        <FormButton
          text="Register"
          onClick={() => onSubmit({ email, password })}
        />
      </form>
    </div>
  );
};

export default SignUp;
