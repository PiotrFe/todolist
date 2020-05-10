import React from "react";
import "./color-picker.styles.scss";

const ColorPicker = () => {
    
    return (
        <div className="color-picker">
            <ul className="color-picker__options">
                <li className="color-picker__option color-picker__option--1"></li>
                <li className="color-picker__option color-picker__option--2"></li>
                <li className="color-picker__option color-picker__option--3"></li>
                <li className="color-picker__option color-picker__option--4"></li>
                <li className="color-picker__option color-picker__option--5"></li>
            </ul>
        </div>
    )
}

export default ColorPicker;