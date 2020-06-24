import React from "react";

import { render, screen, getByTestId, fireEvent } from "@testing-library/react";

import ColorPicker from "./color-picker.component";

describe("<ColorPicker />", () => {
  
  const showColorPicker = jest.fn();
  const applyColor = jest.fn();
  const id = Math.floor(Math.random() * 10);

  const handleClick = jest.fn(() => {
    showColorPicker();
    applyColor();
  });

  const setup = (propOverrides) => {
    const props = Object.assign(
      {
        id,
        showColorPicker,
        applyColor
      },
      propOverrides
    );

    const { getByTestId } = render(<ColorPicker {...props} />);

    return {
      colorPicker: getByTestId("color-picker"),
      colorPickerOption: getByTestId("color-picker__option")
    };
  };

  it("renders with default props", () => {
    const { colorPicker, colorPickerOption } = setup();

    expect(colorPicker).toBeInTheDocument();
    expect(colorPickerOption).toBeInTheDocument();
  });

  it("clicking color option fires onClick event", () => {
    const {colorPickerOption } = setup();

    fireEvent.click(colorPickerOption);

    expect(showColorPicker).toHaveBeenCalledTimes(1);
    expect(applyColor).toHaveBeenCalledTimes(1);
   
  })
});
