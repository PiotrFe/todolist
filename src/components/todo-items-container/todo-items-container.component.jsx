import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

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
  fetchToDosSuccess,
  fetchToDosFailure,
  removeTodo,
  updateTodo  
} from "../../redux/todo-container/todo-container.actions";

import { ActionTypes, Themes, Columns } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = (props) => {
  const { error, loading, todoItems, dispatch } = props;
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
    { column: Columns.TITLE, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH },
    {
      column: Columns.DUE_DATE,
      sortIndex: 0,
      sortDirection: IconTypes.SORT_BOTH,
    },
    { column: Columns.OWNER, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH },
  ];

  const [sorts, updateSorts] = useState(sortsInitial);
  const [filterMode, updateFilterMode] = useState(true);
  const [filters, updateFilters] = useState([]);
  const [filterPreview, updateFilterPreview] = useState();
  const [filterWord, updateFilterWord] = useState("");
  const [filterBarContent, updateFilterBarContent] = useState("");
  const [editMode, updateEditMode] = useState(false);
  const [editedToDo, setEditedToDo] = useState(null);
  const [dragModeOn, toggleDragMode] = useState(false);

  const isMountedRef = useRef(null);
  const inputRef = useRef(null);

  // EFFECTS

  useEffect(() => {
    dispatch(asyncActionBegin());

    fetch("/api/todos/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters }),
    })
      .then((res) => res.json())
      .then((todos) => {
        dispatch(fetchToDosSuccess(todos));
      })
      .catch((err) => {
        dispatch(fetchToDosFailure(err));
      });
  }, [filters]);

  useEffect(() => {
    filterBarContent.length < 3
      ? updateFilterMode(false)
      : updateFilterMode(true);
  }, [filterBarContent]);

  // TO-DO METHODS

  const handleToDoAdd = (newToDoObj) => {
    dispatch(asyncActionBegin());

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToDoObj),
    })
      .then((res) => res.json())
      .then((todo) => {
        dispatch(addToDo(JSON.parse(todo)));
        toggleEditMode();
      });
  };

  const handleToDoRemove = (id) => {
    dispatch(asyncActionBegin());

    fetch(`/api/todos/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((idObj) => {
        const { _id } = idObj;
        dispatch(removeTodo(_id));
      });
  };

  const handleToDoDone = (id) => {
    const todo = todoItems.find((item) => item._id === id);
    handleToDoUpdate({id: todo._id, field: "done", value: !todo.done});
  };

  const handleToDoUpdate = ({id, field, value}) => {
    dispatch(asyncActionBegin());
    console.log(`Update function received valuues: ID: ${id}, FIELD: ${field}, VALUE: ${value} `);

    fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, field, value}),
    })
      .then((res) => res.json())
      .then(({_id, [field]: value}) => {
        dispatch(updateTodo({_id, [field]: value}))
       
      });
  };

  const handleToDoChangeColor = ({ id, color }) => {
    handleToDoUpdate({id, field: "color", value: color});
  };

  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  const editModeHandler = (id) => {
    const editedToDo = todoItems.find((item) => item._id === id);
    setEditedToDo(editedToDo);
    toggleEditMode();
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

  // HANDLING SORTING

  const handleSort = (column) => {
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

  // HANDLING DRAG

  const toggleDrag = (isEnabled) => {
    toggleDragMode(isEnabled);
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
            content={editedToDo}
          />
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { todoItems, loading, error } = state.todoContainer;

  return {
    todoItems,
    loading,
    error,
  };
};

export default connect(mapStateToProps)(ToDoItemsContainer);
