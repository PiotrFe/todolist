import React, { useState } from "react";
import { Icon } from 'rsuite';
import FilterCard from "../../components/filter-card/filter-card.component";

import "./todo-input.styles.scss";

const TodoInput = React.forwardRef(
  (
    {
      content = "",
      placeholder = "",
      activeFilters,
      deleteFilter,
      onChange = null,
      onSubmit = null,
      onClick= null,
      disabled = false,
      onEscPress,
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
        <Icon icon="search" className="search-icon" />
        {activeFilters.map((item, idx) => (
          <FilterCard key={idx} item={item} remove={deleteFilter} />
        ))}
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
          onClick={onClick}
          onKeyDown={e => {
            if(e.keyCode === 27) onEscPress()
          } }
        />
      </form>
    );
  }
);
export default TodoInput;
