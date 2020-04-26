import React, { useState, useEffect, useRef } from "react";

import NavTop from "../../components/nav-top/nav-top.component";
import searchResultList from "../../components/searchResultList/searchResultList.component";
import ToDoItem from "../../components/todo-item/todo-item.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import FilterBar from "../../components/filter-bar/filter-bar.component";

import { ActionTypes, Themes, Columns } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

import "./todo-items.styles.scss";

const ToDoItems = (props) => {
  const sortsInitial = [
    { column: Columns.TITLE, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH },
    { column: Columns.DUE_DATE, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH  },
    { column: Columns.OWNER, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH  },
  ];

  const [todoItems, updateToDoItems] = useState([]);
  const [filters, updateFilters] = useState(["office", "skill", "age"]);
  const [sorts, updateSorts] = useState(sortsInitial);
  const [loading, updateLoading] = useState(false);
  const [filterMode, updateFilterMode] = useState(true);
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

  const submitUpdateHandler = (toDo) => {
    console.log("IN SUBMIT UPDATE HANDLER");
    console.log(JSON.stringify(toDo));

    updateLoading(true);

    fetch(`http://localhost:9000/api/todos/${toDo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    })
      .then((res) => res.json())
      .then((toDo) => {
        updateToDoItems((prevState) => {
          return prevState.map((item) => {
            if (item._id === toDo._id) {
              item = toDo;
            }
            return item;
          });
        });
        updateLoading(false);
        toggleEditMode();
      });
  };

  const editModeHandler = (id) => {
    const editedToDo = todoItems.find((item) => item._id === id);
    setEditedToDo(editedToDo);
    toggleEditMode();
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

  const handleSort = (column) => {
    console.log(column);
    updateSorts((prevState) =>
      prevState.map((item) => {
        if (item.column === column) {
          switch (item.sortDirection) {
            case IconTypes.SORT_BOTH:
              item.sortDirection = IconTypes.SORT_ASC;
              break;
            case IconTypes.SORT_ASC:
              item.sortDirection = IconTypes.SORT_DESC;
              break;
            case IconTypes.SORT_DESC:
              item.sortDirection = IconTypes.SORT_BOTH;
              break;
          }
        }
        return item;
      })
    );
  };

  return (
    <>
      <NavTop
        sorts={sorts}
        actions={{
          [ActionTypes.EDIT]: toggleEditMode,
          [ActionTypes.SORT]: handleSort
        }}
      />
      <FilterBar
        items={filters}
        actions={{
          [ActionTypes.REMOVE]: removeFilter,
          [ActionTypes.SEARCH]: addFilter,
        }}
      />
      {filterMode ? <searchResultList /> : null}

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
                [ActionTypes.EDIT]: editModeHandler,
                [ActionTypes.REMOVE]: removeHandler,
                [ActionTypes.SUBMIT]: submitUpdateHandler,
                [ActionTypes.TOGGLE_DETAILS]: toggleDetailsHandler,
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
              [ActionTypes.EDIT]: submitUpdateHandler,
              [ActionTypes.SUBMIT]: submitHandler,
            }}
            content={editedToDo}
          />
        </>
      ) : null}
    </>
  );
};

export default ToDoItems;
