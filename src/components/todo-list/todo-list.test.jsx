import React from "react";
import {
  render,
  screen,
  getByText,
  getAllByText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import ToDoList from "./todo-list.component";

import { DEFAULT_SORTS } from "../../constants/constants";

const mockStore = configureStore([]);

describe("<TodoList />", () => {
  const setup = ({ propOverrides = {}, storeOverrides = {} } = {}) => {
    const props = Object.assign(
      {
        listID: "123",
        actions: {
          drag: jest.fn(),
          remove: jest.fn(),
          update: jest.fn(),
          edit: jest.fn(),
        },
        dragModeOn: false,
      },
      propOverrides
    );

    const storeObj = Object.assign(
      {
        todoLists: {
          byID: {
            123: {
              allItems: ["234", "456", "567"],
              filters: [],
              itemsFilteredGlobally: ["234", "456", "567"],
              itemsFilteredLocally: ["234", "456", "567"],
              sorts: DEFAULT_SORTS,
              title: "first",
            },
          },
        },
        filters: {
          byID: {
            123: [],
          },
        },
        sorts: {
          byID: {},
        },
        todoItems: {
          byID: {
            234: {
              title: "item 1",
              owner: "peter",
              dueDate: "2018",
              color: "black",
              details: "these are the details",
              done: false,
            },
            456: {
              title: "item 2",
              owner: "paul",
              dueDate: "2018",
              color: "black",
              details: "these are the details",
              done: false,
            },
            567: {
              title: "item 3",
              owner: "mary",
              dueDate: "2018",
              color: "black",
              details: "these are the details",
              done: false,
            },
          },
        },
      },
      storeOverrides
    );

    const store = mockStore(storeObj);

    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <ToDoList {...props} />
      </Provider>
    );

    return {
      firstItemTitle: getAllByText("item 1")[0],
      firstItemOwner: getAllByText("peter")[0],
      secondItemTitle: getAllByText("item 2")[0],
      secondItemOwner: getAllByText("paul")[0],
      thirdItemTitle: getAllByText("item 3")[0],
      thirdItemOwner: getAllByText("mary")[0],
    };
  };

  it("displays default items", () => {
    const {
      firstItemTitle,
      secondItemTitle,
      thirdItemTitle,
      firstItemOwner,
      secondItemOwner,
      thirdItemOwner,
    } = setup();

    expect(firstItemTitle).toBeInTheDocument();
    expect(secondItemTitle).toBeInTheDocument();
    expect(thirdItemTitle).toBeInTheDocument();

    expect(firstItemOwner).toBeInTheDocument();
    expect(secondItemOwner).toBeInTheDocument();
    expect(thirdItemOwner).toBeInTheDocument();
  });

  it("shows correct item data", () => {
    const {
      firstItemTitle,
      secondItemTitle,
      thirdItemTitle,
      firstItemOwner,
      secondItemOwner,
      thirdItemOwner,
    } = setup();

    expect(firstItemTitle).toHaveTextContent("item 1");
    expect(secondItemTitle).toHaveTextContent("item 2");
    expect(thirdItemTitle).toHaveTextContent("item 3");

    expect(firstItemOwner).toHaveTextContent("peter");
    expect(secondItemOwner).toHaveTextContent("paul");
    expect(thirdItemOwner).toHaveTextContent("mary");
  });
});
