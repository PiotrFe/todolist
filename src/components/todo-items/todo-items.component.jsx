import React, { useState, useEffect, useRef } from "react";


import NavTop from "../../components/nav-top/nav-top.component";
import SearchResultList from "../../components/searchResultList/searchResultList.component";
import ToDoItem from "../../components/todo-item/todo-item.component";
import Overlay from "../../components/overlay/overlay.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoItemSmall from "../../components/todo-item-small/todo-item-small.component";

import { ActionTypes, Themes, Columns } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

import "./todo-items.styles.scss";

const ToDoItems = (props) => {
  const sortsInitial = [
    { column: Columns.TITLE, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH },
    {
      column: Columns.DUE_DATE,
      sortIndex: 0,
      sortDirection: IconTypes.SORT_BOTH,
    },
    { column: Columns.OWNER, sortIndex: 0, sortDirection: IconTypes.SORT_BOTH },
  ];

  const [todoItems, updateToDoItems] = useState([]);
  const [sorts, updateSorts] = useState(sortsInitial);
  const [loading, updateLoading] = useState(false);
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
    fetch("/api/todos/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters }),
    })
      .then((res) => res.json())
      .then((todos) => {
        updateToDoItems(todos);
        updateLoading(false);
      })
      .catch((err) => {
        updateLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    filterBarContent.length < 3 ? updateFilterMode(false) : updateFilterMode(true);

  }, [filterBarContent])

  // TO-DO METHODS

  const submitHandler = (newToDoObj) => {
    updateLoading(true);

    fetch("/api/todos", {
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
    fetch(`/api/todos/${id}`, {
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

    fetch(`/api/todos/${id}`, {
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
    updateLoading(true);

    fetch(`/api/todos/${toDo._id}`, {
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

  const changeColorHandler = ({id, color}) => {
    updateLoading(true);

    fetch(`api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "text/plain"
      },
      body: color 
    })
    .then(res => res.json())
    .then((todo) => {
      updateToDoItems(prevState => {
        return prevState.map((item) => {
          if (item._id === id) {
            item.color = color;
          }
          return item;
      });
    });
    updateLoading(false);
  });
  }

  const toggleEditMode = () => {
    updateEditMode(!editMode);
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

  // HANDLING FILTERS

  const updateFilterBar = content => {
    updateFilterBarContent(content);
  }

  const applyFilter = (item) => {
    updateLoading(true);
    updateFilters((prevState) => {
      return [...prevState, item];
    });
    updateFilterPreview();
    updateFilterMode(false);
    updateFilterWord("");
    updateFilterBarContent("");
    updateLoading(false);
  };

  const removeFilter = (filter) => {
    const [keyToRemove, valueToRemove] = Object.entries(filter)[0];
    updateLoading(true);
    updateFilters((prevState) => {
      return prevState.filter((item) => Object.keys(item)[0] !== keyToRemove || Object.values(item)[0] !== valueToRemove);
    });
    updateLoading(false);
  }

  const showFilterPreview = (word) => {

    fetch("api/todos/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: filters, keyword: word }),
    })
    .then((res) => res.json())
    .then(todos => {
      updateFilterMode(true);
      updateFilterWord(word);
      updateFilterPreview(todos);
    } );
  };

  // HANDLING DRAG & DROP

  const toggleDrag = (isEnabled) => {
    console.log(`Received in function: ${isEnabled}`);
    toggleDragMode(isEnabled)
    
  }

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

  return (
    <>
      <NavTop
        sorts={sorts}
        actions={{
          [ActionTypes.DRAG]: toggleDrag,
          [ActionTypes.EDIT]: toggleEditMode,
          [ActionTypes.SORT]: handleSort
        }}
        dragModeOn={dragModeOn}
      />
      <FilterBar
        tags={filters}
        content={filterBarContent}
        actions={{
          [ActionTypes.CHANGE]: updateFilterBar,
          [ActionTypes.SUBMIT]: showFilterPreview,
          [ActionTypes.REMOVE]: removeFilter
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

      {!dragModeOn ? null :  

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
            color
          }) => (
            <>
            <ToDoItem
              actions={{
                [ActionTypes.CHANGE]: changeColorHandler,
                [ActionTypes.DONE]: doneHandler,
                [ActionTypes.EDIT]: editModeHandler,
                [ActionTypes.REMOVE]: removeHandler,
                [ActionTypes.SUBMIT]: submitUpdateHandler,
                [ActionTypes.TOGGLE_DETAILS]: toggleDetailsHandler,
              }}
              color={color}
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
            <ToDoItemSmall 
            id={_id}
            dueDate={dueDate}
            owner={owner}
            title={title}/>
            </>
          )
        )}
      </div>

}


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
