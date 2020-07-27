import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import { Toggle, Button } from "rsuite";

import { ActionTypes } from "../../constants/constants";

import {
  asyncActionBegin,
  dropToDo,
  updateSorts,
} from "../../redux/todo-container/todo-container.actions";

import {
  addToDo,
  removeToDo,
  updateToDo,
} from "../../redux/todo-lists-container/todo-lists-container.actions";

import { fetchFilteredToDoS } from "../../redux/filter-bar/filter-bar.actions";

import { selectSorts } from "../../redux/todo-container/todo-container.selectors";

import { selectFilters } from "../../redux/filter-bar/filter-bar.selectors";

import { DEFAULT_SORTS } from "../../constants/constants";

import "./todo-items-container.styles.scss";

const ToDoItemsContainer = ({
  listID,
  inCockpit = false,
  title,
  filters = [],
  todoItems,
  addToDo,
  dropToDo,
  fetchFilteredToDoS,
  sorts = DEFAULT_SORTS,
  removeToDo,
  updateSorts,
  updateToDo,
  children,
}) => {
  const { DRAG, EDIT, REMOVE, SORT, UPDATE } = ActionTypes;

  // Local state
  const [editMode, updateEditMode] = useState(false);
  const [dragModeOn, toggleDragMode] = useState(false);

  // Effects
  useEffect(() => {
    fetchFilteredToDoS({ listID, filters, sorts });
  }, [JSON.stringify(sorts)]);

  // Methods
  const toggleEditMode = () => {
    updateEditMode(!editMode);
  };

  const handleToDoUpdate = ({ todoID, field, value }) => {
    // asyncActionBegin();
    updateToDo({ todoID, field, value });
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

  // if component is rendered in cockpit, it gets a custom NavTob; otherwise gets a default one
  return (
    <div
      className={`todo-items-container ${
        inCockpit ? "todo-items-container--cockpit" : null
      }`}
    >
      <div className="todo-items-container__header-group">
        <div className="todo-items-container__title">{title}</div>
        {inCockpit ? (
          children
        ) : (
          <NavTop
            listID={listID}
            actions={{
              [DRAG]: toggleDrag,
              [EDIT]: toggleEditMode,
              [SORT]: updateSorts,
            }}
            sorts={sorts}
            dragModeOn={dragModeOn}
          />
        )}

        <FilterBar listID={listID} inCockpit={inCockpit} />

        <div className="header-top__action-icons">
          <Toggle
            size="md"
            checkedChildren="Ready"
            unCheckedChildren="Sort"
            onChange={toggleDrag}
          />
          <Button side="md" onClick={(listID, toggleEditMode)}>
            Add
          </Button>
          <Button side="md">Download</Button>
        </div>
      </div>

      <ToDoItems
        listID={listID}
        todoItems={todoItems}
        actions={{
          [DRAG]: handleDragEnd,
          [REMOVE]: removeToDo,
          [UPDATE]: handleToDoUpdate,
        }}
        dragModeOn={dragModeOn}
      />
      {!inCockpit && editMode ? (
        <>
          <Overlay show={true} onClick={null} opaque={true} />
          <ToDoModal
            listID={listID}
            actions={{
              [ActionTypes.CANCEL]: toggleEditMode,
              [ActionTypes.SUBMIT]: ({ listID, todo }) => {
                toggleEditMode(!editMode);
                addToDo({ listID, todo });
              },
            }}
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
  sorts: selectSorts,
});

const mapDispatchToProps = (dispatch) => ({
  addToDo: ({ listID, todo }) => dispatch(addToDo({ listID, todo })),
  asyncActionBegin: () => dispatch(asyncActionBegin()),
  dropToDo: (idxFrom, idxTo) => dispatch(dropToDo(idxFrom, idxTo)),
  removeToDo: ({ todoID, listID }) => dispatch(removeToDo({ todoID, listID })),
  updateSorts: (listID, field) => dispatch(updateSorts({ listID, field })),
  updateToDo: ({ todoID, field, value }) =>
    dispatch(updateToDo({ todoID, field, value })),
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
