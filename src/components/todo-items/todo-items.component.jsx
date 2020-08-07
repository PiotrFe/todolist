import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ToDoItem from "../../components/todo-item/todo-item.component";

import ToDoItemSmall from "../../components/todo-item-small/todo-item-small.component";
import ToDoItemEditable from "../../components/todo-item-editable/todo-item-editable.component";
import ConditionalWrapper from "../utils/ConditionalWrapper.util";

import { ActionTypes } from "../../constants/constants";

import "./todo-items.styles.scss";

const ToDoList = ({ listID, todoItems, actions, dragModeOn, sorts }) => {
  const {
    ADD,
    CHANGE,
    CHANGE_COLOR,
    DONE,
    DRAG,
    EDIT,
    REMOVE,
    SORT,
    SUBMIT,
    UPDATE,
  } = ActionTypes;
  const [editedToDo, setEditedToDo] = useState(null);
  let baseProps, additionalProps;

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
              <div
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
                {!todoItems
                  ? null
                  : todoItems.map(
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
                        baseProps = {
                          color,
                          id: _id,
                          idx,
                          dueDate,
                          owner,
                          sorts,
                          title,
                        };

                        additionalProps = {
                          details,
                          detailsDraft,
                          done,
                          draft,
                          editMode,
                          listID,
                        };

                        return !dragModeOn ? (
                          <ToDoItem
                            key={_id}
                            actions={{
                              [REMOVE]: actions[REMOVE],
                              [UPDATE]: actions[UPDATE],
                            }}
                            {...baseProps}
                            {...additionalProps}
                          />
                        ) : (
                          <ToDoItemSmall key={`${_id}_small`} {...baseProps} />
                        );

                      }
                    )}
        </div>


      </ConditionalWrapper>
      </ConditionalWrapper>
    </>
  );
};

export default ToDoList;
