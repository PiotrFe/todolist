import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App2";
import { IconTypes } from "./components/icon/icon.types";

xdescribe("App", () => {

  it("renders App component", () => {
    render(<App />);

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.queryByText(/Signed in/)).toBeNull();
  });

  it("renders a form", () => {
    render(<App />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toEqual(1);
    expect(screen.getByRole("button")).toHaveTextContent(/submit/i);
    expect(screen.getByRole("button")).toHaveClass("button");


    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toEqual(1);
  });

  it("typing into input fires an event", () => {
    render(<App />);

    screen.debug();

    expect(screen.getByRole("textbox")).toHaveValue("enter your name");

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Javascript" }
    });

    screen.debug();

    expect(screen.getByRole("textbox")).toHaveValue("Javascript");
  })

});
