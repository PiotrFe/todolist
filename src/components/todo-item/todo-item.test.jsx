import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ActionTypes } from "../../constants/constants";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import ToDoItem from "./todo-item.component";
import { DEFAULT_SORTS } from "../../constants/constants";
import { parseDate, formatDate } from "../utils/utils";

const mockStore = configureStore([]);

describe("<ToDoItem />", () => {
  const date = "2020-09-25T00:00:00.000Z";
  let props;

  const setup = ({ propOverrides = {}, storeOverrides = {} } = {}) => {
    props = Object.assign(
      {
        _id: 123,
        key: 123,
        actions: {
          [ActionTypes.REMOVE]: jest.fn(),
          [ActionTypes.UPDATE]: jest.fn(),
          [ActionTypes.EDIT]: jest.fn(),
        },
        sorts: DEFAULT_SORTS,
      },
      propOverrides
    );

    const storeProps = Object.assign(
      {
        title: "my item",
        owner: "peter",
        dueDate: date,
        color: "black",
        details: "these are the details",
        done: false,
      },
      storeOverrides
    );

    const storeObj = {
      todoItems: {
        byID: {
          123: storeProps,
        },
      },
    };

    const store = mockStore(storeObj);

    const displayDate = formatDate(
      new Date(storeObj.todoItems.byID[123].dueDate)
    );

    const { getByText, getAllByText, getByTestId } = render(
      <div className="root" id="root">
      <Provider store={store}>
        <ToDoItem {...props} />
      </Provider>
      <div className="modal-root" id="modal-root"></div>
      </div>
    );

    return {
      title: getAllByText(storeObj.todoItems.byID[123].title),
      owner: getAllByText(storeObj.todoItems.byID[123].owner),
      details: getByText(storeObj.todoItems.byID[123].details),
      date: getAllByText(displayDate),
      buttonEdit: getByText("Edit"),
    };
  };

  it("renders with default props", () => {
    const { title, owner, details, date, buttonEdit } = setup();

    expect(title[0]).toBeInTheDocument();
    expect(title[1]).toBeInTheDocument();
    expect(owner[0]).toBeInTheDocument();
    expect(owner[1]).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(date[0]).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    const { title, owner, details } = setup({
      storeOverrides: {
        owner: "paul",
        title: "second item",
        details: "new details",
      },
    });

    expect(owner[0]).toHaveTextContent("paul");
    expect(owner[1]).toHaveTextContent("paul");
    expect(title[0]).toHaveTextContent("second item");
    expect(title[1]).toHaveTextContent("second item");
    expect(details).toHaveTextContent("new details");
  });

});
