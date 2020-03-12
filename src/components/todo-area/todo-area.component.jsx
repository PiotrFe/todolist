import React from "react";

import TodoInput from "../../components/todo-input/todo-input.component";
import ToDoItems from "../../components/todo-items/todo-items.component";

import { ActionTypes } from "../../constants/constants";

import Aux from "../hoc/auxiliary.component";

class TodoArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: []
    };
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
          return (item.done = !item.done);
        }
      });

      return { ToDoItems: updatedToDos };
    });
  };

  updateHandler = (idx, text) => {
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

      return {ToDoItems: updatedToDos}
    })

  }

  render() {
    return (
      <Aux>
        <TodoInput onSubmit={this.submitHandler} />
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
      </Aux>
    );
  }
}

export default TodoArea;
