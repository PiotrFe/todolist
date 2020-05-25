import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import {
  asyncActionBegin,
  addToDo,
  dropToDo,
  fetchToDosSuccess,
  fetchToDosFailure,
  removeTodo,
  updateTodo,
} from "../../redux/todo-container/todo-container.actions";

import {
  selectToDos,
  selectLoading,
  selectError,
  selectToDosCount,
  selectToDosDoneCount,
  selectToDosPendingCount,
} from "../../redux/todo-container/todo-container.selectors";

import { ActionTypes, Themes, ToDoFields } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = ({
  error,
  loading,
  todoItems,
  addToDo,
  asyncActionBegin,
  dropToDo,
  fetchToDosSuccess,
  fetchToDosFailure,
  removeTodo,
  updateTodo,
}) => {
  const {
    ADD,
    CHANGE,
    CHANGE_COLOR,
    DONE,
    DRAG,
    EDIT,
    REMOVE,
    SORT,
    SUBMIT,
    UPDATE,
  } = ActionTypes;

  const sortsInitial = [
    { field: ToDoFields.TITLE, sortDirection: 0 },
    { field: ToDoFields.DUE_DATE, sortDirection: 1 },
    { field: ToDoFields.OWNER, sortDirection: 0 },
    { field: ToDoFields.COLOR, sortDirection: 0 },
  ];

  const [sorts, updateSorts] = useState(sortsInitial);
  const [filterMode, updateFilterMode] = useState(true);
  const [filters, updateFilters] = useState([]);
  const [filterPreview, updateFilterPreview] = useState();
  const [filterWord, updateFilterWord] = useState("");
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);

  const isMountedRef = useRef(null);
  const inputRef = useRef(null);

  // EFFECTS

  useEffect(() => {
    asyncActionBegin();

    fetch("/api/todos/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters, sorts }),
    })
      .then((res) => res.json())
      .then((todos) => {
        fetchToDosSuccess(todos);
      })
      .catch((err) => {
        fetchToDosFailure(err);
      });
  }, [filters, sorts]);

  useEffect(() => {
    filterBarContent.length < 3
      ? updateFilterMode(false)
      : updateFilterMode(true);
  }, [filterBarContent]);

  // TO-DO METHODS

  const handleToDoAdd = (newToDoObj) => {
    asyncActionBegin();

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToDoObj),
    })
      .then((res) => res.json())
      .then((todo) => {
        addToDo(JSON.parse(todo));
        toggleEditMode();
      });
  };

  const handleToDoRemove = (id) => {
    asyncActionBegin();

    fetch(`/api/todos/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((idObj) => {
        const { _id } = idObj;
        removeTodo(_id);
      });
  };

  const handleToDoDone = (id) => {
    const todo = todoItems.find((item) => item._id === id);
    handleToDoUpdate({ id: todo._id, field: "done", value: !todo.done });
  };

  const handleToDoChangeColor = ({ id, color }) => {
    handleToDoUpdate({ id, field: "color", value: color });
  };

  const handleToDoUpdate = ({ id, field, value }) => {
    asyncActionBegin();
    console.log(
      `Update function received valuues: ID: ${id}, FIELD: ${field}, VALUE: ${value} `
    );

    fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, value }),
    })
      .then((res) => res.json())
      .then(({ _id, field, value }) => updateTodo({ _id, field, value }));
  };

  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  // HANDLING FILTERS
  const updateFilterBar = (content) => {
    updateFilterBarContent(content);
  };

  const applyFilter = (item) => {
    // updateLoading(true);
    updateFilters((prevState) => {
      return [...prevState, item];
    });
    updateFilterPreview();
    updateFilterMode(false);
    updateFilterWord("");
    updateFilterBarContent("");
    // updateLoading(false);
  };

  const removeFilter = (filter) => {
    const [keyToRemove, valueToRemove] = Object.entries(filter)[0];
    // updateLoading(true);
    updateFilters((prevState) => {
      return prevState.filter(
        (item) =>
          Object.keys(item)[0] !== keyToRemove ||
          Object.values(item)[0] !== valueToRemove
      );
    });
    // updateLoading(false);
  };

  const showFilterPreview = (word) => {
    fetch("api/todos/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: filters, keyword: word }),
    })
      .then((res) => res.json())
      .then((todos) => {
        updateFilterMode(true);
        updateFilterWord(word);
        updateFilterPreview(todos);
      });
  };

  // HANDLING SORT
  const handleSort = (field) => {
    updateSorts((prevState) =>
      prevState.map((item) => {
        if (item.field === field) {
          switch (item.sortDirection) {
            case 0:
              item.sortDirection = 1;
              break;
            case 1:
              item.sortDirection = -1;
              break;
            case -1:
              item.sortDirection = 0;
              break;
          }
        } else {
          item.sortDirection = 0;
        }
        return item;
      })
    );
  };

  // HANDLING DRAG
  const toggleDrag = (isEnabled) => {
    toggleDragMode(isEnabled);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dropToDo(source.index, destination.index);
  };

  return (
    <>
      <NavTop
        sorts={sorts}
        actions={{
          [DRAG]: toggleDrag,
          [EDIT]: toggleEditMode,
          [SORT]: handleSort,
        }}
        dragModeOn={dragModeOn}
      />
      <FilterBar
        tags={filters}
        content={filterBarContent}
        actions={{
          [CHANGE]: updateFilterBar,
          [SUBMIT]: showFilterPreview,
          [REMOVE]: removeFilter,
        }}
      />
      {filterMode ? (
        <SearchResultList
          word={filterWord}
          content={filterPreview}
          actions={{
            [ActionTypes.SEARCH]: applyFilter,
          }}
        />
      ) : null}
      <ToDoItems
        todoItems={todoItems}
        actions={{
          [ADD]: handleToDoAdd,
          [CHANGE_COLOR]: handleToDoChangeColor,
          [DONE]: handleToDoDone,
          [DRAG]: handleDragEnd,
          [REMOVE]: handleToDoRemove,
          [UPDATE]: handleToDoUpdate,
        }}
        dragModeOn={dragModeOn}
      />
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
              [ActionTypes.EDIT]: handleToDoUpdate,
              [ActionTypes.SUBMIT]: handleToDoAdd,
            }}
          />
        </>
      ) : null}
    </>
  );
};

// const mapStateToProps = (state) => {
//   const { todoItems, loading, error } = state.todoContainer;

//   return {
//     todoItems,
//     loading,
//     error,
//   };
// };

const mapStateToProps = createStructuredSelector({
  todoItems: selectToDos,
  loading: selectLoading,
  error: selectError
});

const mapDispatchToProps = (dispatch) => ({
  asyncActionBegin: () => dispatch(asyncActionBegin()),
  addToDo: (todo) => dispatch(addToDo(todo)),
  dropToDo: (idxFrom, idxTo) => dispatch(dropToDo(idxFrom, idxTo)),
  fetchToDosSuccess: (todos) => dispatch(fetchToDosSuccess(todos)),
  fetchToDosFailure: (err) => dispatch(fetchToDosFailure(err)),
  removeTodo: (id) => dispatch(removeTodo(id)),
  updateTodo: ({ _id, field, value }) =>
    dispatch(updateTodo({ _id, field, value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
