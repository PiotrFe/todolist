import React, { useState } from "react";

import "./todo-input.styles.scss";

const TodoInput = React.forwardRef(
  (
    {
      content = "",
      placeholder = "",
      onChange = null,
      onSubmit = null,
      disabled = false,
    },
    ref
  ) => {
    const [inputVal, updateInputVal] = useState(content);

    return (
      <form
        className="todo-input__search-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (onChange && onSubmit) onSubmit();
          else if (onSubmit) onSubmit(inputVal);
        }}
      >
        <input
          disabled={disabled}
          type="text"
          className="todo-input__search-field"
          id="filter-search-field"
          name="filter"
          ref={ref}
          value={content}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
            else updateInputVal(e.target.value);
          }}
        />
      </form>
    );
  }
);
export default TodoInput;
