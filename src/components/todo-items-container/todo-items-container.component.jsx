import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NavTop from "../../components/nav-top/nav-top.component";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ToDoItems from "../../components/todo-items/todo-items.component";
import Overlay from "../../components/overlay/overlay.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";
import Icon from "../icon/icon.component";
import Slider from "../slider/slider.component";

import { IconTypes } from "../icon/icon.types";
import { Sizes, ActionTypes, ToDoFields } from "../../constants/constants";

import {
  asyncActionBegin,
  dropToDo,
  updateSorts,
  fetchFilteredToDoS,
} from "../../redux/todo-container/todo-container.actions";

import {
  addToDo,
  removeToDo,
  updateToDo,
} from "../../redux/todo-lists-container/todo-lists-container.actions";

import {
  selectFilters,
  selectSorts,
} from "../../redux/todo-container/todo-container.selectors";

import { DEFAULT_SORTS } from "../../constants/constants";

import "./todo-items-container.styles.scss";
import { useCallback } from "react";

const ToDoItemsContainer = ({
  listID,
  inCockpit = false,
  title,
  filters = [],
  todoItems,
  // filtersLength,
  addToDo,
  dropToDo,
  fetchFilteredToDoS,
  sorts = DEFAULT_SORTS,
  removeFilter,
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
    // debugger;
    fetchFilteredToDoS({ listID, filters, sorts });
  }, [filters.length, JSON.stringify(sorts)]);

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
    <div className="todo-items-container">
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

      <FilterBar
        listID={listID}
        actions={{
          [REMOVE]: removeFilter,
        }}
      />

      <div className="header-top__action-icons">
        <Slider toggle={toggleDrag} dragModeOn={dragModeOn} />

        <Icon
          id={null}
          type={IconTypes.ADD}
          parent={null}
          onClick={(listID, toggleEditMode)}
          size={Sizes.SMALL}
        />
        <Icon
          id={null}
          type={IconTypes.DOWNLOAD}
          parent={null}
          onClick={null}
          size={Sizes.SMALL}
        />
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
  fetchFilteredToDoS: ({ listID, filters, sorts }) =>
    dispatch(fetchFilteredToDoS({ listID, filters, sorts })),
  removeToDo: ({ todoID, listID }) => dispatch(removeToDo({ todoID, listID })),
  updateSorts: (listID, field) => dispatch(updateSorts({ listID, field })),
  updateToDo: ({ todoID, field, value }) =>
    dispatch(updateToDo({ todoID, field, value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsContainer);
