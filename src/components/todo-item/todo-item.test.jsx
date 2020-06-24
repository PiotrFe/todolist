import React from "react";
import {
  render,
  screen,
  fireEvent,
  getAllByText,
  getAllByTestId,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import ToDoItem from "./todo-item.component";

import { ToDoFields } from "../../constants/constants";
import { ActionTypes, Themes, Columns } from "../../constants/constants";

import { useState } from "react";

describe("<ToDoItem />", () => {
  const { DONE, REMOVE } = ActionTypes;

  const setup = (propOverrides) => {
    const props = Object.assign(
      {
        actions: {
          [DONE]: jest.fn(),
          [REMOVE]: jest.fn(),
        },
        details: "todo details",
        done: false,
        dueDate: new Date(),
        id: Math.floor(Math.random() * 10),
        owner: "John Smith",
        title: "todo for today",
        color: "#bbe1fa",
      },
      propOverrides
    );

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((init) => [init, setState]);

    const {
      getByText,
      getAllByText,
      getAllByTestId,
      getByLabelText,
      rerender,
      debug,
      container
    } = render(<ToDoItem {...props} />);

    return {
      props,
      debug,
      container,
      titleFrontTextField: getAllByText(props.title)[0],
      titleBackTextField: getAllByText(props.title)[1],
      removeIcon: getAllByTestId("icon_remove")[0],
      doneIcon: getAllByTestId("icon_done")[0],
      editIcon: getAllByTestId("icon_edit")[0],
    };
  };

  it("renders with defaults", () => {
    const {
      titleFrontTextField,
      titleBackTextField,
      removeIcon,
      doneIcon,
      debug,
    } = setup();

    expect(titleFrontTextField).toBeInTheDocument();
    expect(titleBackTextField).toBeInTheDocument();
    expect(removeIcon).toBeInTheDocument();
    expect(doneIcon).toBeInTheDocument();
  });

  it("clicking icons fires related actions", () => {
    const {
      props: { actions },
      doneIcon,
      removeIcon,
      debug,
    } = setup();

    fireEvent.click(doneIcon);
    expect(actions[DONE]).toHaveBeenCalledTimes(1);

    fireEvent.click(removeIcon);
    expect(actions[REMOVE]).toHaveBeenCalledTimes(1);
    expect(actions[REMOVE].mock.calls.length).toBe(1);
  });

  it("clicking edit icon toggles edit mode", () => {
      const {editIcon, saveButton, titleEditableTextField, debug} = setup();
      const onChange = jest.fn();

      fireEvent.click(editIcon);
      expect(screen.getByText("Save")).toBeInTheDocument();
      
      userEvent.type(screen.getByLabelText("Title"), "my new todo");
      expect(screen.getByLabelText("Title")).toHaveValue("my new todo");



    //   userEvent.type(titleEditableTextField, "my new to do");
    //   expect(titleEditableTextField).toHaveValue("my new to do");

      
  })


});
