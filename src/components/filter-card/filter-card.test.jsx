import React from "react";
import {
  render,
  getByText,
  getAllByText,
  getByTestId, fireEvent
} from "@testing-library/react";

import FilterCard from "./filter-card.component";

describe("<FilterCard />", () => {
  const setup = (propOverrides, expectedReturn) => {
    const item = {
      owner: "peter",
      status: "active",
    };

    const props = Object.assign(
      {
        item,
        remove: null,
      },
      propOverrides
    );

    const returnVal = expectedReturn || "owner: peter";

    const { getByText } = render(<FilterCard {...props} />);

    return {
      card: getByText(returnVal),
      button: getByText("x"),
    };
  };

  it("renders with default props", () => {
    const { card } = setup();

    expect(card).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    const propOverride = {
      item: {
        owner: "mary",
      },
    };

    const { card } = setup(propOverride, "owner: mary");

    expect(card).toBeInTheDocument();
  });

  it("runs function passed in props when user clicks button", () => {
    const propOverride = {
      remove: jest.fn(),
    };

    const { button } = setup(propOverride)

    fireEvent.click(button);

    expect(propOverride.remove.mock.calls.length).toBe(1);

  });
});
