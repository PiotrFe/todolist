import React from "react";

import Icon from "../icon/icon.component";
import { IconTypes } from "../icon/icon.types";
import { Components, Sizes } from "../../constants/constants";

import "./input-field.styles.scss";

const InputField = ({ idx, size, actions, value }) => {
  return (
    <form
      action="/"
      className="input-form"
      onSubmit={e => {
        e.preventDefault();
        actions.submit(idx);
      }}
    >
      <div className="input-form-group">
        <input
          className={`input-field input-field--${size}`}
          type="text"
          value={value}
          placeholder="Edit here"
          onChange={e => actions.update(idx, e.target.value)}
        />
        <Icon
          type={IconTypes.BACKSPACE}
          onClick={actions.remove}
          parent={Components.INPUT_FIELD}
          size={Sizes.MEDIUM}
        />
      </div>
    </form>
  );
};

export default InputField;
