import React from "react";
import { render, screen, getByText, getByTestId, getAllByText, queryByText, getAllByTestId } from "@testing-library/react";

import ToDoItems from "./todo-items.component";
import { IconTypes } from "../icon/icon.types";

describe("<ToDoItems />", () => {

    const todoItems = [
        {
        _id: "1",
        title: "first todo",
        details: "no details",
        draft: "",
        detailsDraft: "",
        dueDate: new Date(2020, 11, 31),
        owner: "John Smith",
        done: false,
        editMode: false,
        color: "black",
        },
        {
        _id: "2",
        title: "second todo",
        details: "many details",
        draft: "",
        detailsDraft: "",
        dueDate: new Date(2020, 10, 30),
        owner: "Patty Smith",
        done: true,
        editMode: true,
        color: "white",
        },
    ];

    const actions = [];
    const dragModeOn = false;

    const setup = (propOverrides) => {
        const props = Object.assign(
        {
            todoItems,
            actions,
            dragModeOn,
        },
        propOverrides
        );

    const { getAllByText } = render(<ToDoItems {...props} />);

    return {
        firstToDoTitle: getAllByText("first todo")[0],
        firstToDoOwner: getAllByText("John Smith")[0],
        firstToDoDate: getAllByText("31-12-2020")[0],
        secondToDoTitle: getAllByText("second todo")[0],
        secondToDoOwner: getAllByText("Patty Smith")[0],
        secondToDoDate: getAllByText("30-11-2020")[0]

    }
  };
    it("renders with default props", () => {
        const {firstToDoTitle, firstToDoOwner, secondToDoTitle, secondToDoOwner, firstToDoDate, secondToDoDate} = setup();

        const firstToDoDetails = screen.getAllByText("no details")[0];
        const secondToDoDetails = screen.getAllByText("many details")[0];

        expect(firstToDoTitle).toBeInTheDocument();
        expect(firstToDoDetails).toBeInTheDocument();
        expect(firstToDoOwner).toBeInTheDocument();
        expect(firstToDoDate).toBeInTheDocument();
        expect(secondToDoTitle).toBeInTheDocument();
        expect(secondToDoDetails).toBeInTheDocument();
        expect(secondToDoOwner).toBeInTheDocument();
        expect(secondToDoDate).toBeInTheDocument();

    });

    it("renders small todo components if dragModeOn", () => {
        const {firstToDoTitle, firstToDoOwner, secondToDoTitle, secondToDoOwner, firstToDoDate, secondToDoDate} = setup({dragModeOn: true});

        const firstToDoDetails = screen.queryByText("no details");
        const secondToDoDetails = screen.queryByText("many details");

        expect(firstToDoTitle).toBeInTheDocument();
        expect(firstToDoOwner).toBeInTheDocument();
        expect(secondToDoTitle).toBeInTheDocument();
        expect(secondToDoOwner).toBeInTheDocument();
        expect(firstToDoDate).toBeInTheDocument();
        expect(secondToDoDate).toBeInTheDocument();

        expect(firstToDoDetails).toBeNull();
        expect(secondToDoDetails).toBeNull();
        
    })
}
);
