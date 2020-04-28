import React, { useEffect } from "react";

import ButtonAdd from "../button-add/button-add.component";
import InputField from "../input-field/input-field.component";

import ThemeContext from "../../contexts/ThemeContext";

import { ActionTypes, Sizes, Themes } from "../../constants/constants";

import "./todo-input.styles.scss";
import { useState } from "react";

const TodoInput = ({ onSearch, onType }) => {
  const [inputValue, updateInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length >= 3) {
      onType(inputValue);
    }

  }, [inputValue]);

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        const fieldValue = e.target.elements.filter.value;
        e.preventDefault();
        onSearch(fieldValue);
        e.target.elements.filter.value = "";
      }}
    >
      <input
        type="text"
        className="search-field"
        id="filter-search-field"
        name="filter"
        value={inputValue}
        onChange={(e) => updateInputValue(e.target.value)}
      />
    </form>
  );
};
export default TodoInput;
