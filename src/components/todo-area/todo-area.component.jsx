import React, { useState, useEffect, useRef } from "react";

import TodoInput from "../../components/todo-input/todo-input.component";
import ToDoItems from "../../components/todo-items/todo-items.component";

import { ActionTypes, Themes } from "../../constants/constants";

import "./todo-area.styles.scss";

const TodoArea = props => {
  const [todoItems, updateToDoItems] = useState([]);
  const [theme, toggleTheme] = useState(Themes.LIGHT);
  const [loading, toggleLoading] = useState(false);
  
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    fetch("http://localhost:9000/api/todos")
      .then(todos => todos.json())
      .then(data => updateToDoItems(data));

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    console.log("Search field offset: " + inputRef.current.offsetTop);
    console.log("Page Y offset: " + window.pageYOffset);

    const sticky = inputRef.current.offsetTop;
    if (window.pageYOffset > sticky) {
      inputRef.current.classList.add("sticky");
    } else {
      inputRef.current.classList.remove("sticky");
    }
  };

  const submitHandler = newToDoObj => {
    const { newToDoTitle = "" } = newToDoObj;
    const newToDo = {
      title: newToDoTitle,
      details: "",
      draft: newToDoTitle,
      detailsDraft: "",
      done: false,
      editMode: false,
      detailsVisible: false
    };

    fetch("http://localhost:9000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToDo)
    })
      .then(res => res.json())
      .then(todo => {
        updateToDoItems(prevState => [...prevState, JSON.parse(todo)]);
      });
  };

  const removeHandler = id => {
    fetch(`http://localhost:9000/api/todos/${id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(idObj => {
        updateToDoItems(prevState => {
          return prevState.filter(item => {
            return item._id !== idObj._id;
          });
        });
      });
  };

  const editHandler = id => {
    updateToDoItems(prevState => {
      return prevState.map(item => {
        if (item._id === id) {
          item.editMode = true;
        }
        return item;
      });
    });
  };

  const doneHandler = id => {
    const todo = todoItems.find(item => item._id === id);
    todo.done = !todo.done;

    fetch(`http://localhost:9000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(todo => {
        updateToDoItems(prevState => {
          return prevState.map(item => {
            if (item._id === todo._id) {
              item = todo;
            }
            return item;
          });
        });
      });
  };

  const updateHandler = ({ id, parent: field, value }) => {
    
    updateToDoItems(prevState => {
      return prevState.map(item => {
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
    const todo = todoItems.find(item => item._id === id);

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .then(todo => {
      updateToDoItems(prevState => {
        return prevState.map(item => {
          if (item._id === todo._id) {
            item = todo;
          }
          return item;
        });
      });
    })
  };

  const toggleDetailsHandler = id => {
    updateToDoItems(prevState => {
      return prevState.map(item => {
        if (item._id === id) {
          item.detailsVisible = !item.detailsVisible;
        }
        return item;
      });
    });
  };

  return (
    <div className="todo-area">
      <div className="todo-area__input-wrapper" ref={inputRef}>
        <TodoInput className="todo-input-main" onSubmit={submitHandler} />
      </div>
      <ToDoItems
        items={todoItems}
        actions={{
          [ActionTypes.REMOVE]: removeHandler,
          [ActionTypes.EDIT]: editHandler,
          [ActionTypes.DONE]: doneHandler,
          [ActionTypes.UPDATE]: updateHandler,
          [ActionTypes.SUBMIT]: submitUpdateHandler,
          [ActionTypes.TOGGLE_DETAILS]: toggleDetailsHandler
        }}
      />
    </div>
  );
};

export default TodoArea;
