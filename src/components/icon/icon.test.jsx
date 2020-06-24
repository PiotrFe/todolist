import React from "react";

import Icon from "./icon.component";

import {
  render,
  screen,
  debug,
  fireEvent,
  getByText,
} from "@testing-library/react";

import { Sizes } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

describe("<Icon />", () => {
  const size = Sizes.SMALL;
  const type = IconTypes.COLOR;
  const handleClick = jest.fn();

  const setup = (propOverrides) => {
    const props = Object.assign({
      size,
      type,
      handleClick,
    }, propOverrides);

   const {getByTestId} = render(<Icon {...props} />);

   return {
    icon: getByTestId("icon_color")
   } 
    
  };

  it("renders with default props", () => {
    const {icon} = setup();
    expect(icon).toBeInTheDocument();

  })

  it("calls correct functon on click", () => {
    const {icon} = setup();
    // screen.debug();

    fireEvent.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);

  });
});
