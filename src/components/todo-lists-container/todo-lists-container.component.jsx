import React, { useEffect } from "react";
import { connect } from "react-redux";

import ToDoItemsContainer from "../todo-items-container/todo-items-container.component";

import {
  fetchListsStart,
  fetchLists,
  fetchListsSuccess,
  fetchListsFailure,
} from "../../redux/todo-lists-container/todo-lists-container.actions";

import "./todo-lists-container.styles.scss";

const ToDoListsContainer = ({
  fetchListsStart,
  fetchLists,
  fetchListsSuccess,
  fetchListsFailure,
  todoLists,
}) => {
  useEffect(() => {
    fetchListsStart();
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

const mapStateToProps = (state) => {
  return {
    todoLists: state.todoListsContainer.todoLists,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchListsStart: () => dispatch(fetchListsStart()),
  fetchLists: () => dispatch(fetchLists()),
  fetchListsSuccess: (todos) => dispatch(fetchListsSuccess(todos)),
  fetchListsFailure: (error) => dispatch(fetchListsFailure(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListsContainer);
