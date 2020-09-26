import React from "react";
import ToDoInput from "./todo-input.component";
import {
  screen,
  render,
  getByText,
  getAllByText,
  fireEvent,
} from "@testing-library/react";

import TodoInput from "./todo-input.component";
import { set } from "d3";

describe("<TodoInput />", () => {
  const setup = (propOverrides = {}) => {
    const { placeholder: placeholderProp } = propOverrides;
    const placeholder = placeholderProp || "";

    const props = Object.assign(
      {
        content: "",
        placeholder: placeholder,
        activeFilters: [],
        deleteFilter: null,
        onChange: null,
        onSubmit: null,
        onClick: null,
        disabled: false,
        onEscPress: null,
        ref: null,
      },
      propOverrides
    );

    const { getByText, getAllByText, getByPlaceholderText } = render(
      <TodoInput {...props} />
    );

    const filterCards = props.activeFilters.reduce(
      (acc, item, idx) => {
        const [key, val] = Object.entries(item)[0];
        return {
          ...acc,
          [`filterCard${idx + 1}`]: getByText(`${key}: ${val}`),
        };
      },

      {}
    );

    return {
      inputField: getByPlaceholderText(placeholder),
      ...filterCards,
    };
  };

  it("displays the input field", () => {
    const { inputField } = setup();

    expect(inputField).toBeInTheDocument();
  });

  it("renders correct value on receipt content prop", () => {
    const { inputField } = setup({ content: "hello there" });

    expect(inputField).toHaveValue("hello there");
  });

  it("renders correct value on receipt placeholder prop", () => {
    const placeHolder = "placeholder value";
    const { inputField } = setup({ placeholder: placeHolder });

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute("placeholder", placeHolder);
  });

  it("fires events passed as props", () => {
    const click = jest.fn();
    const change = jest.fn();

    const { inputField } = setup({ onClick: click, onChange: change });

    fireEvent.click(inputField);
    fireEvent.change(inputField, { target: { value: "t" } });

    expect(click.mock.calls.length).toBe(1);
    expect(change.mock.calls.length).toBe(1);
  });

  it("renders filter cards on receipt of filter array", () => {
    const filters = [{ title: "tomorrow" }, { owner: "michael" }];

    const { filterCard1, filterCard2 } = setup({ activeFilters: filters });

    expect(filterCard1).toHaveTextContent("title: tomorrow");
    expect(filterCard2).toHaveTextContent("owner: michael");
  });

  it("fires passed function on escape key press", () => {
    const handleESCPress = jest.fn();
    const { inputField } = setup({ onEscPress: handleESCPress });

    fireEvent.keyDown(inputField, { key: "Escape", code: "Escape", keyCode: 27});

    expect(handleESCPress.mock.calls.length).toBe(1);
  });
});
