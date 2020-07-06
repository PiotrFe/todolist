import React from "react";

import "./form-input.styles.scss";

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className="form__group">
        <input className="form__input" onChange={(event) => handleChange(event.target.value)} {...otherProps}/>
        {label ? (
            <label className={`form__label ${otherProps.value.length > 0 ? "shrink" : null}`}>{label}</label>
        ) : null}
    </div>
)

export default FormInput;