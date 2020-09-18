import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ToDoItemsContainer from "../todo-items-container/todo-items-container.component";
import Overlay from "../../components/overlay/overlay.component";
import Input from "../../components/todo-input/todo-input.component";
import ErrorBoundary from "../utils/ErrorBoundary";

import {
  selectToDoLists,
  selectLoading,
} from "../../redux/todo-lists-container/todo-lists-container.selectors";

import { fetchLists } from "../../redux/todo-lists-container/todo-lists-container.actions";

import "./todo-lists-container.styles.scss";
import { useCallback } from "react";

const ToDoListsContainer = ({ todoLists, loading, fetchLists }) => {
  const didMount = useRef(false);

  const doFetchLists = useCallback(() => {
    if (!didMount.current) {
      fetchLists();
    }
  }, [didMount.current]);

  useEffect(() => {
    doFetchLists();
    didMount.current = true;
    return () => (didMount.current = false);
  }, [doFetchLists]);

  return (
    <div className="todo-list-container">
      {todoLists.map((_id) => (
        <ErrorBoundary key={_id} message="Unable to load container" fallback={<h4>Unable to show container</h4>}>
        <ToDoItemsContainer key={_id} listID={_id} />
        </ErrorBoundary>
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
