import * as sagas from "./todo-container.sagas";
import { takeLatest, take, call, put, all } from "redux-saga/effects";

import {
  fetchToDosSuccess,
  fetchToDosFailure,
  addToDoSuccess,
  addToDoFailure,
  removeToDoSuccess,
  removeToDoFailure,
  updateToDoSuccess,
  updateToDoFailure,
} from "./todo-container.actions";

describe("ToDoContainer sagas", () => {
  const dummyToDos = [
    {
      _id: 1,
      title: "first todo",
      details: "none",
      draft: "",
      detailsDraft: "",
      dueDate: new Date(),
      owner: "John Smith",
      done: false,
      editMode: false,
      color: "black",
    },

    {
      _id: 2,
      title: "second todo",
      details: "none",
      draft: "",
      detailsDraft: "",
      dueDate: new Date(),
      owner: "Mary Smith",
      done: true,
      editMode: false,
      color: "white",
    },
  ];

  const action = {
    type: "",
    payload: {
      filters: "",
      sorts: "",
    },
  };

  const mockFetch = (expectedReturn) => {
    return (...args) => {
      return Promise.resolve({
        json: () => Promise.resolve(expectedReturn),
      });
    };
  };

  const setup = async (expectedReturn) => {
    const fetch = mockFetch(expectedReturn);
    global.fetch = fetch;

    const resObject = await fetch(null);
    const jsonPromise = resObject.json();
    const jsonData = await resObject.json();

    return {
      resObject,
      jsonPromise,
      jsonData,
    };
  };

  it("fetchCollection should get data from API and call success action", async () => {
    const { resObject, jsonPromise, jsonData } = await setup(dummyToDos);

    const gen = sagas.fetchCollection(action);

    expect(gen.next().value).toEqual(fetch(action));
    expect(gen.next(resObject).value).toEqual(jsonPromise);
    expect(gen.next(jsonData).value).toEqual(
      put(fetchToDosSuccess(dummyToDos))
    );
  });

  it("addToDo should post data to API and call success action", async () => {
    const dummyToDo = JSON.stringify(dummyToDos[0]);

    const { resObject, jsonPromise, jsonData } = await setup(dummyToDo);

    const gen = sagas.addToDo(action);

    expect(gen.next().value).toEqual(fetch(dummyToDo));
    expect(gen.next(resObject).value).toEqual(jsonPromise);
    expect(gen.next(jsonData).value).toEqual(
      put(addToDoSuccess(JSON.parse(dummyToDo)))
    );
  });

  it("removeToDo should post data to API and call success action", async () => {
    const dummyToDo = dummyToDos[1];
    const action = {
      type: "",
      payload: {
        id: 2
      },
    };

    const { resObject, jsonPromise, jsonData } = await setup(dummyToDo);

    const gen = sagas.removeToDo(action);

    expect(gen.next().value).toEqual(fetch(resObject));
    expect(gen.next(resObject).value).toEqual(jsonPromise);
    expect(gen.next(jsonData).value).toEqual(put(removeToDoSuccess(dummyToDo._id)));
  });
});
