import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ToDoItemsContainer from "../todo-items-container/todo-items-container.component";

import { selectToDoLists } from "../../redux/todo-lists-container/todo-lists-container.selectors";

import { fetchLists } from "../../redux/todo-lists-container/todo-lists-container.actions";

import "./todo-lists-container.styles.scss";

const ToDoListsContainer = ({ fetchLists, todoLists }) => {
  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="todo-list-container">
      {todoLists.map(({ title, owner, todos }) => {
        return <ToDoItemsContainer title={title} todos={todos} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  todoLists: selectToDoLists,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLists: () => dispatch(fetchLists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListsContainer);
