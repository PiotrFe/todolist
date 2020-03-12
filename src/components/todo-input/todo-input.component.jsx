import React, { useState } from "react";

import ButtonAdd from "../button-add/button-add.component";
import InputField from "../input-field/input-field.component";

import { ActionTypes, Sizes } from "../../constants/constants";

import "./todo-input.styles.scss";

const TodoInput = props => {
  const [inputValue, updateInputValue] = useState("");

  function handleChange(idx = null, updatedVal) {
    updateInputValue(updatedVal);
  }

  function handleClick() {
    props.onSubmit(inputValue);
  }

  return (
    <div className="input-container">
      <h1>To-do items</h1>
      <div className="input-box">
        <InputField
          actions={{ 
            [ActionTypes.UPDATE]: handleChange,
            [ActionTypes.SUBMIT]: handleClick }}
          value={inputValue}
          size={Sizes.LARGE}
          
        />
        <ButtonAdd onClick={handleClick} />
      </div>
    </div>
  );
};
export default TodoInput;
