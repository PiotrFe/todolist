import React, { useEffect } from "react";

import ButtonAdd from "../button-add/button-add.component";
import InputField from "../input-field/input-field.component";

import ThemeContext from "../../contexts/ThemeContext";

import { ActionTypes, Sizes, Themes } from "../../constants/constants";

import "./todo-input.styles.scss";

const TodoInput = ({ onSearch }) => {



  return (
      <form className="search-form" onSubmit={e => {
        const fieldValue = e.target.elements.filter.value
        e.preventDefault();
        onSearch(fieldValue);
        e.target.elements.filter.value = "";
      }}>
        <input type="text" className="search-field" id="filter-search-field" name="filter"/>
      </form>

  );
};
export default TodoInput;
