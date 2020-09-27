import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  screen,
  debug,
  render,
  getByText,
  getAlLByText,
  getByPlaceholderText,
  fireEvent,
} from "@testing-library/react";

import FilterBar from "./filter-bar.component";

import { MAIN_INPUT_ID } from "../../constants/constants";

const mockStore = configureStore();

describe("<FilterBar />", () => {
  const placeholderText = "Type to search in list";

  const setup = ({
    storeOverrides = {},
    propOverrides = {},
    customQuery = {},
  } = {}) => {
    const storeObj = Object.assign(
      {
        filters: {
          byID: {},
        },
        sorts: {
          byID: {},
        },
        filterBar: {
          previewByListID: {},
        },
      },
      storeOverrides
    );

    const props = Object.assign(
      {
        listID: 123,
        inCockpit: false,
        placeholder: placeholderText,
        disabled: false,
      },
      propOverrides
    );

    const store = mockStore(storeObj);

    const { getByText, getAllByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <FilterBar {...props} />
      </Provider>
    );

    return {
      inputField: getByPlaceholderText(placeholderText),
      ...customQuery,
    };
  };

  it("correctly renders invidual components", () => {
    const { inputField } = setup();

    expect(inputField).toBeInTheDocument();
  });

  it("updates value of input box on type", () => {
    const { inputField } = setup();

    fireEvent.change(inputField, { target: { value: "yo" } });

    expect(inputField.value).toBe("yo");
  });

  it("shows a loading screen when fetching preview", () => {
    const propOverrides = {
      listID: 456,
    };
    const storeOverridesLoading = {
      filterBar: {
        previewByListID: {
          456: {
            error: "",
            loading: true,
            filters: [],
            preview: [],
          },
        },
      },
    };

    const { inputField } = setup({
      propOverrides,
      storeOverrides: storeOverridesLoading,
    });

    fireEvent.change(inputField, { target: { value: "pete" } });

    const loadingMessage = screen.getByText("LOADING...");

    expect(loadingMessage).toBeInTheDocument();
  });

  it("shows result preview if length of input value > 3", () => {
    const propOverrides = {
      listID: 456,
    };

    const storeOverridesReady = {
      filterBar: {
        previewByListID: {
          456: {
            error: "",
            loading: false,
            filters: [],
            preview: [
              {
                title: "title",
                todos: [
                  {
                    lists: [456],
                    title: "first item",
                    details: "",
                    owner: "peter",
                  },
                  {
                    lists: [456],
                    title: "second item",
                    details: "",
                    owner: "paul",
                  },
                ],
              },
            ],
          },
        },
      },
    };

    const { inputField } = setup({
      propOverrides,
      storeOverrides: storeOverridesReady,
    });

    fireEvent.change(inputField, { target: { value: "peter" } });

    const previewHeaderAll = screen.getByText("all");
    const previewHeaderOwner = screen.getByText("owner");
    const previewContent = screen.getAllByText("peter");

    expect(previewHeaderAll).toBeInTheDocument();
    expect(previewContent[0]).toBeInTheDocument();
    expect(previewHeaderOwner).toBeInTheDocument();
    expect(previewContent[1]).toBeInTheDocument();
  });

  it("shows no results screen if no preview available", () => {
    const propOverrides = {
      listID: 456,
    };
    const storeOverridesNoResults = {
      filterBar: {
        previewByListID: {
          456: {
            error: "",
            loading: false,
            filters: [],
            preview: [],
          },
        },
      },
    };

    const { inputField } = setup({
      propOverrides,
      storeOverrides: storeOverridesNoResults,
    });

    fireEvent.change(inputField, { target: { value: "pete" } });

    const noResultsMessage = screen.getByText("No results");

    expect(noResultsMessage).toBeInTheDocument();
  });
});
