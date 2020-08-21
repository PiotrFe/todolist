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
  selectTodos,
  selectLocalView,
} from "../../redux/todo-list/todo-list.selectors";
import { selectSorts } from "../../redux/sorts/sorts.selectors";
import {
  selectGlobalFilters,
  selectGlobalFilteredData,
} from "../../redux/filters/filters.selectors";

import { filterToDos } from "./todo-list.utils";

import { ActionTypes } from "../../constants/constants";

import "./todo-list.styles.scss";

const ToDoList = ({
  listID,
  todoItems,
  localView,
  actions,
  dragModeOn,
  sorts,
  globalFilters,
  globalFilteredData,
}) => {
  const { DRAG, REMOVE, UPDATE } = ActionTypes;

  const [editedToDo, setEditedToDo] = useState(null);
  const [visibleToDos, updateVisibleToDos] = useState(localView);

  const mainInputFiltersChangedAfterRender = useRef(false);

  const filterData = useCallback(() => {
    // if there are global filters, filter todos against them and return a filtered array of ids
    if (globalFilteredData.length) {
      return filterToDos({
        mainSet: todoItems,
        subSet: globalFilteredData,
      });
    }

    // otherwise return the latest local view
    return localView;
  }, [JSON.stringify(globalFilteredData), JSON.stringify(localView)]);

  useEffect(() => {
    updateVisibleToDos(filterData());
  }, [filterData]);

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
  filters: selectFilters,
  localView: selectLocalView,
  globalFilters: selectGlobalFilters,
  globalFilteredData: selectGlobalFilteredData,
  sorts: selectSorts,
  todoItems: selectTodos,
});

export default connect(mapStateToProps)(ToDoList);
