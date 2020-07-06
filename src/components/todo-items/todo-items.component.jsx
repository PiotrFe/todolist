import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ToDoItem from "../../components/todo-item/todo-item.component";

import ToDoItemSmall from "../../components/todo-item-small/todo-item-small.component";
import ToDoItemEditable from "../../components/todo-item-editable/todo-item-editable.component";
import ConditionalWrapper from "../utils/ConditionalWrapper.util";


import { ActionTypes, Themes, Columns } from "../../constants/constants";
import { IconTypes } from "../icon/icon.types";

import "./todo-items.styles.scss";

const ToDoList = ({todoItems, actions, dragModeOn}) => {

  const {ADD, CHANGE, CHANGE_COLOR, DONE, DRAG, EDIT, REMOVE, SORT, SUBMIT, UPDATE} = ActionTypes;

  const [editedToDo, setEditedToDo] = useState(null);


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
            <Droppable droppableId={`RANDOM_ID`}>
              {(provided, snapshot) => (
                <div
                  className={`droppable ${
                    snapshot.isDraggingOver ? `droppable--is-dragging-over` : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {children}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        >
          <div className="todo-items">
            {!todoItems ? null : todoItems.map(
              (
                {
                  _id,
                  title,
                  details,
                  draft,
                  detailsDraft,
                  dueDate,
                  owner,
                  done,
                  editMode,
                  color,
                },
                idx
              ) => {
                return !dragModeOn ? (
                  <ToDoItem
                    actions={{
                      [CHANGE]: actions[CHANGE],
                      [CHANGE_COLOR]: actions[CHANGE_COLOR],
                      [DONE]: actions[DONE],
                      [EDIT]: actions[EDIT],
                      [REMOVE]: actions[REMOVE],
                      [UPDATE]: actions[UPDATE],
                    }}
                    color={color}
                    details={details}
                    detailsDraft={detailsDraft}
                    done={done}
                    dueDate={dueDate}
                    draft={draft}
                    editMode={editMode}
                    id={_id}
                    key={_id}
                    owner={owner}
                    title={title}
                  />
                ) : (
                  <ToDoItemSmall
                    color={color}
                    id={_id}
                    key={_id}
                    idx={idx}
                    dueDate={dueDate}
                    owner={owner}
                    title={title}
                  />
                );
              }
            )}
          </div>
        </ConditionalWrapper>
      </ConditionalWrapper>
      }

    </>
  );
};


export default ToDoList;
