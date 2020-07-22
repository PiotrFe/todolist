import React, { useEffect } from "react";

import "./todo-input.styles.scss";

const TodoInput = React.forwardRef(
  (
    { content = "", placeholder = "", onChange = null, onSubmit = null },
    ref
  ) => {
    return (
      <form
        className="todo-input__search-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit();
        }}
      >
        <input
          type="text"
          className="todo-input__search-field"
          id="filter-search-field"
          name="filter"
          ref={ref}
          value={content}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      </form>
    );
  }
);
export default TodoInput;
