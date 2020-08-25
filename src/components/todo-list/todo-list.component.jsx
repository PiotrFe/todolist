import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ToDoItem from "../todo-item/todo-item.component";
import ToDoItemSmall from "../todo-item-small/todo-item-small.component";
import ToDoItemEditable from "../todo-item-editable/todo-item-editable.component";
import ConditionalWrapper from "../utils/ConditionalWrapper.util";

import {
  selectAllItems,
  selectItemsFilteredLocally,
  selectItemsFilteredGlobally,
} from "../../redux/todo-list/todo-list.selectors";

import { selectSorts } from "../../redux/sorts/sorts.selectors";

import { selectGlobalFiltersCount } from "../../redux/filters/filters.selectors";

import { ActionTypes } from "../../constants/constants";

import "./todo-list.styles.scss";

const ToDoList = ({
  listID,
  todoItemsFilteredLocally,
  todoItemsFilteredGlobally,
  globalFiltersCount,
  actions,
  dragModeOn,
  sorts,
}) => {
  const { DRAG, REMOVE, UPDATE } = ActionTypes;

  const [editedToDo, setEditedToDo] = useState(null);
  const [visibleToDos, updateVisibleToDos] = useState(null);

  useEffect(() => {
    if (globalFiltersCount > 0) {
      updateVisibleToDos(todoItemsFilteredGlobally);
    } else updateVisibleToDos(todoItemsFilteredLocally);
  }, [
    JSON.stringify(todoItemsFilteredGlobally),
    JSON.stringify(todoItemsFilteredLocally),
    globalFiltersCount,
  ]);


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
            {!visibleToDos
              ? null
              : visibleToDos.map((_id) => {
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
  todoItems: selectAllItems,
  todoItemsFilteredLocally: selectItemsFilteredLocally,
  todoItemsFilteredGlobally: selectItemsFilteredGlobally,
  globalFiltersCount: selectGlobalFiltersCount,
  sorts: selectSorts
});

export default connect(mapStateToProps)(ToDoList);
