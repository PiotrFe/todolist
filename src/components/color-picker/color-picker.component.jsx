import React from "react";
import "./color-picker.styles.scss";

import {CustomColors} from "./color-picker.types";

const ColorPicker = ({id, applyColor, showColorPicker}) => {
    console.log(`id number: ${id}`);
    
    return (
        <div className="color-picker" onMouseLeave={() => showColorPicker(false)}>
            <ul className="color-picker__options">
                <li className="color-picker__option color-picker__option--1" 
                    style={{backgroundColor: CustomColors.COLOR_1}} 
                    onClick={() => {
                        showColorPicker(false);
                        applyColor({id, color: CustomColors.COLOR_1});
                    } }></li>
                <li className="color-picker__option color-picker__option--2" 
                    style={{backgroundColor: CustomColors.COLOR_2}} 
                    onClick={() => {
                        showColorPicker(false);
                        applyColor({id, color: CustomColors.COLOR_2});
                    } }></li>
                <li className="color-picker__option color-picker__option--3" 
                    style={{backgroundColor: CustomColors.COLOR_3}} 
                    onClick={() => {
                        showColorPicker(false);
                        applyColor({id, color: CustomColors.COLOR_3});
                    } }></li>
                <li className="color-picker__option color-picker__option--4" 
                    style={{backgroundColor: CustomColors.COLOR_4}} 
                    onClick={() => {
                        showColorPicker(false);
                        applyColor({id, color: CustomColors.COLOR_4});
                    } }></li>
                <li className="color-picker__option color-picker__option--5" 
                    style={{backgroundColor: CustomColors.COLOR_5}} 
                    onClick={() => {
                        showColorPicker(false);
                        applyColor({id, color: CustomColors.COLOR_5});
                    } }></li>
            </ul>
        </div>
    )
}

export default ColorPicker;