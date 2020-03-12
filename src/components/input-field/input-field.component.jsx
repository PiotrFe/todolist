import React from "react";

import "./input-field.styles.scss";

const InputField = props => {
  return (
    <form
      action="/"
      className="input-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.actions.submit(props.idx)
      }
    }
    >
      <input
        className="input-field"
        type="text"
        value={props.value}
        placeholder="Enter to-do item"
        onChange={e => props.actions.update(props.idx, e.target.value)
        }
      />
    </form>
  );
};

export default InputField;
