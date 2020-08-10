import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ToDoItemsContainer from "../todo-items-container/todo-items-container.component";
import Overlay from "../../components/overlay/overlay.component";

import {
  selectToDoLists,
  selectLoading,
} from "../../redux/todo-lists-container/todo-lists-container.selectors";

import { fetchLists } from "../../redux/todo-lists-container/todo-lists-container.actions";

import "./todo-lists-container.styles.scss";

const ToDoListsContainer = ({ todoLists, loading, fetchLists }) => {
  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="todo-list-container">
      {todoLists.map((_id) => (
        <ToDoItemsContainer key={_id} listID={_id} />
      ))}
      {loading && <Overlay withSpinner={true} />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  todoLists: selectToDoLists,
  loading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLists: () => dispatch(fetchLists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListsContainer);
