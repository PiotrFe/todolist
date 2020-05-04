import React, { useEffect } from "react";

import ButtonAdd from "../button-add/button-add.component";
import InputField from "../input-field/input-field.component";

import ThemeContext from "../../contexts/ThemeContext";

import { ActionTypes, Sizes, Themes } from "../../constants/constants";

import "./todo-input.styles.scss";
import { useState } from "react";

const TodoInput = ({ content = "", onChange, onSubmit }) => {
  useEffect(() => {
    if (content.length >= 3) {
      onSubmit(content);
    }

  }, [content]);

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        // const fieldValue = e.target.elements.filter.value;
        e.preventDefault();
        // onSearch(content);
      }}
    >
      <input
        type="text"
        className="search-field"
        id="filter-search-field"
        name="filter"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
};
export default TodoInput;
