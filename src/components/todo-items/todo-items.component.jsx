import React, { useState, useEffect, useRef } from "react";

import NavTop from "../../components/nav-top/nav-top.component";
import TodoInput from "../../components/todo-input/todo-input.component";
import ToDoItem from "../../components/todo-item/todo-item.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import FilterBar from "../../components/filter-bar/filter-bar.component";

import { ActionTypes, Themes } from "../../constants/constants";

import "./todo-items.styles.scss";

const ToDoItems = (props) => {
  const [todoItems, updateToDoItems] = useState([]);
  const [filters, updateFilters] = useState(["office", "skill", "age"]);
  const [loading, updateLoading] = useState(false);
  const [editMode, updateEditMode] = useState(false);
  const [editedToDo, setEditedToDo] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:9000/api/todos")
      .then((todos) => todos.json())
      .then((data) => updateToDoItems(data));
  }, []);

  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  const submitHandler = (newToDoObj) => {
    updateLoading(true);

    fetch("http://localhost:9000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToDoObj),
    })
      .then((res) => res.json())
      .then((todo) => {
        updateToDoItems((prevState) => [...prevState, JSON.parse(todo)]);
        updateLoading(false);
        toggleEditMode();
      });
  };

  const removeHandler = (id) => {
    fetch(`http://localhost:9000/api/todos/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((idObj) => {
        updateToDoItems((prevState) => {
          return prevState.filter((item) => {
            return item._id !== idObj._id;
          });
        });
      });
  };

  const doneHandler = (id) => {
    const todo = todoItems.find((item) => item._id === id);
    todo.done = !todo.done;

    fetch(`http://localhost:9000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((todo) => {
        updateToDoItems((prevState) => {
          return prevState.map((item) => {
            if (item._id === todo._id) {
              item = todo;
            }
            return item;
          });
        });
      });
  };

  const updateHandler = ({ id, parent: field, value }) => {
    updateToDoItems((prevState) => {
      return prevState.map((item) => {
        if (item._id === id) {
          if (field === "title") {
            item.title = value;
            item.draft = value;
          }

          if (field === "details") {
            item.details = value;
            item.detailsDraft = value;
          }
        }
        return item;
      });
    });
  };

  const submitUpdateHandler = ({ id, parent: field }) => {
    const todo = todoItems.find((item) => item._id === id);

    if (field === "title") {
      todo.title = todo.draft;
      todo.editMode = false;
    }
    if (field === "details") {
      todo.details = todo.detailsDraft;
      todo.editMode = false;
    }

    fetch(`http://localhost:9000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((todo) => {
        updateToDoItems((prevState) => {
          return prevState.map((item) => {
            // item.title = "rerendered";
            if (item._id === todo._id) {
              item = todo;
            }
            return item;
          });
        });
      });
  };

  const editHandler = (id) => {
    const editedToDo = todoItems.find((item) => item._id === id);
    setEditedToDo(editedToDo);
    toggleEditMode();
  };

  const submitEditedHandler = (toDo) => {
    // fetch(`http://localhost:9000/api/todos/${}`);

    // updateToDoItems((prevState) =>
    //   prevState.map((item) => (item.id === toDo.id ? toDo : item))
    // );
    // setEditedToDo(null);
  };

  const toggleDetailsHandler = (id) => {
    updateToDoItems((prevState) => {
      return prevState.map((item) => {
        if (item._id === id) {
          item.detailsVisible = !item.detailsVisible;
        }
        return item;
      });
    });
  };

  const addFilter = (text) => {
    updateFilters((prevState) => [...prevState, text]);
  };

  const removeFilter = (idx) => {
    const updatedFilters = filters.filter((item, itemIdx) => idx !== itemIdx);
    updateFilters(updatedFilters);
  };

  return (
    <>
      <NavTop
        actions={{
          [ActionTypes.EDIT]: toggleEditMode,
        }}
      />
      <FilterBar
        items={filters}
        actions={{
          [ActionTypes.REMOVE]: removeFilter,
          [ActionTypes.SEARCH]: addFilter,
        }}
      />

      <div className="todo-items">
        {todoItems.map(
          ({
            _id,
            title,
            details,
            draft,
            detailsDraft,
            dueDate,
            owner,
            done,
            editMode,
            detailsVisible,
          }) => (
            <ToDoItem
              actions={{
                [ActionTypes.DONE]: doneHandler,
                [ActionTypes.EDIT]: editHandler,
                [ActionTypes.REMOVE]: removeHandler,
                [ActionTypes.SUBMIT]: submitUpdateHandler,
                [ActionTypes.TOGGLE_DETAILS]: toggleDetailsHandler,
                [ActionTypes.UPDATE]: updateHandler,
              }}
              details={details}
              detailsDraft={detailsDraft}
              detailsVisible={detailsVisible}
              done={done}
              dueDate={dueDate}
              draft={draft}
              editMode={editMode}
              id={_id}
              key={_id}
              owner={owner}
              title={title}
            />
          )
        )}
      </div>

      {loading ? (
        <>
          <Overlay show={loading} onClick={null} opaque={true} />
          <LoadingSpinner />
        </>
      ) : null}

      {editMode ? (
        <>
          <Overlay show={true} onClick={null} opaque={true} />
          <ToDoModal
            actions={{
              [ActionTypes.CANCEL]: toggleEditMode,
              [ActionTypes.EDIT]: submitEditedHandler,
              [ActionTypes.SUBMIT]: submitHandler
            }}
            content={editedToDo}
          />
        </>
      ) : null}
    </>
  );
};

export default ToDoItems;
