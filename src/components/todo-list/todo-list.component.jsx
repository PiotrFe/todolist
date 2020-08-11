import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ToDoItem from "../todo-item/todo-item.component";
import ToDoItemSmall from "../todo-item-small/todo-item-small.component";
import ToDoItemEditable from "../todo-item-editable/todo-item-editable.component";
import ConditionalWrapper from "../utils/ConditionalWrapper.util";

import {
  selectFilters,
  selectTitle,
  selectTodos,
} from "../../redux/todo-list/todo-list.selectors";

import { selectSorts } from "../../redux/sorts/sorts.selectors";

import {
  selectDataFromMainFilter,
} from "../../redux/filter-bar/filter-bar.selectors";

import { filterToDos } from "./todo-list.utils";

import { ActionTypes } from "../../constants/constants";

import "./todo-list.styles.scss";

const ToDoList = ({ listID, todoItems, actions, dragModeOn, sorts, mainInputFilteredData }) => {
  const { DRAG, REMOVE, UPDATE } = ActionTypes;

  const [editedToDo, setEditedToDo] = useState(null);
  const [localView, updateLocalView] = useState(todoItems);

  const mainInputFiltersChangedAfterRender = useRef(false);

  const filterData = useCallback(() => {
    return filterToDos({
      mainSet: todoItems,
      subSet: mainInputFilteredData.todos,
    });
  }, [JSON.stringify(todoItems)]);

  useEffect(() => {
    updateLocalView(filterData());
  }, [filterData]);

  useEffect(() => {
    if (mainInputFiltersChangedAfterRender.current) {
      if (mainInputFilteredData.filters.length === 0) {
        updateLocalView(todoItems);
      } else {
        updateLocalView(mainInputFilteredData.todos);
      }
    } else mainInputFiltersChangedAfterRender.current = true;
  }, [JSON.stringify(mainInputFilteredData)]);

  return (
    <>
      <ConditionalWrapper
        condition={dragModeOn}
        wrapper={(children) => (
          <DragDropContext onDragEnd={(result) => actions[DRAG](result)}>
            {children}
          </DragDropContext>
        )}
      >
        <ConditionalWrapper
          condition={dragModeOn}
          wrapper={(children) => (
            <Droppable droppableId={listID}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {children}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        >
          <div className="todo-items">
            {!todoItems
              ? null
              : todoItems.map((_id) => {
                  return !dragModeOn ? (
                    <ToDoItem
                      _id={_id}
                      key={_id}
                      actions={{
                        [REMOVE]: actions[REMOVE],
                        [UPDATE]: actions[UPDATE],
                      }}
                      sorts={sorts}
                    />
                  ) : (
                    <ToDoItemSmall key={`${_id}_small`} />
                  );
                })}
          </div>
        </ConditionalWrapper>
      </ConditionalWrapper>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
  sorts: selectSorts,
  todoItems: selectTodos,
  mainInputFilteredData: selectDataFromMainFilter,
});

export default connect(mapStateToProps)(ToDoList);
