import React from "react";

import TodoInput from "../../components/todo-input/todo-input.component";
import ToDoItems from "../../components/todo-items/todo-items.component";

import { ActionTypes, Themes } from "../../constants/constants";

import "./todo-area.styles.scss";

class TodoArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      theme: Themes.LIGHT
    };

    this.inputRef = React.createRef();
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler() {
    console.log("Search field offset: " + this.inputRef.current.offsetTop);
    console.log("Page Y offset: " + window.pageYOffset);

    const sticky = this.inputRef.current.offsetTop;
    if (window.pageYOffset > sticky) {
      this.inputRef.current.classList.add("sticky");
    } else {
      this.inputRef.current.classList.remove("sticky");
    }
  }

  submitHandler = newToDoText => {
    const newToDo = {
      text: newToDoText,
      draft: "",
      done: false,
      editMode: false
    };

    this.setState(prevState => ({
      todoItems: [...prevState.todoItems, newToDo]
    }));
  };

  removeHandler = idx => {
    this.setState(prevState => {
      const updatedToDos = prevState.todoItems.filter((item, index) => {
        return index !== idx;
      });

      return { todoItems: updatedToDos };
    });
  };

  editHandler = (idx, text) => {
    this.setState(prevState => {
      const updatedToDos = prevState.todoItems.map((item, index) => {
        if (idx === index) {
          item.editMode = true;

          return item;
        }
      });

      return { ToDoItems: updatedToDos };
    });
  };

  doneHandler = idx => {
    this.setState(prevState => {
      const updatedToDos = prevState.todoItems.map((item, index) => {
        if (idx === index) {
          item.done = !item.done;
          return item;
        }
      });

      return { ToDoItems: updatedToDos };
    });
  };

  updateHandler = (idx, text = "") => {
    this.setState(prevState => {
      const updatedToDos = prevState.todoItems.map((item, index) => {
        if (index === idx) {
          item.draft = text;
          item.text = text;

          return item;
        }
      });

      return { ToDoItems: updatedToDos };
    });
  };

  submitUpdateHandler = idx => {
    this.setState(prevState => {
      const updatedToDos = prevState.todoItems.map((item, index) => {
        if (index === idx) {
          item.text = item.draft;
          item.draft = "";
          item.editMode = false;

          return item;
        }
      });

      return { ToDoItems: updatedToDos };
    });
  };

  render() {
    return (
      <div className="todo-area">
        <div className="todo-area__input-wrapper" ref={this.inputRef}>
          <TodoInput
            className="todo-input-main"
            onSubmit={this.submitHandler}
          />
        </div>
        <ToDoItems
          items={this.state.todoItems}
          actions={{
            [ActionTypes.REMOVE]: this.removeHandler,
            [ActionTypes.EDIT]: this.editHandler,
            [ActionTypes.DONE]: this.doneHandler,
            [ActionTypes.UPDATE]: this.updateHandler,
            [ActionTypes.SUBMIT]: this.submitUpdateHandler
          }}
        />
      </div>
    );
  }
}

export default TodoArea;
