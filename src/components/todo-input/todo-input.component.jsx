import React, { useState, useContext } from "react";

import ButtonAdd from "../button-add/button-add.component";
import InputField from "../input-field/input-field.component";

import ThemeContext from "../../contexts/ThemeContext";

import { ActionTypes, Sizes, Themes } from "../../constants/constants";

import "./todo-input.styles.scss";

const TodoInput = ({ onSubmit }) => {
  const [inputValue, updateInputValue] = useState("");
  const { themeType, toggle } = useContext(ThemeContext);

  function handleChange({ value }) {
    updateInputValue(value);
  }

  function handleClick() {
    onSubmit({ newToDoTitle: inputValue });
  }

  // function handleFocus() {
  //   props.onFocus();
  // }

  return (
    <div className="input-container">
      <div className="input-box">
        <InputField
          actions={{
            [ActionTypes.UPDATE]: handleChange,
            [ActionTypes.SUBMIT]: handleClick
          }}
          value={inputValue}
          size={Sizes.LARGE}
        />
        <ButtonAdd onClick={handleClick} />
      </div>
    </div>
  );
};
export default TodoInput;
