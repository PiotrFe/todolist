import React from "react";

import "./form-button.styles.scss";

const FormButton = ({text, isGoogle, ...otherProps}) => (

<button className={`form-button ${isGoogle ? "form-button--google" : null}`}{...otherProps}>{text}</button>

)

export default FormButton;