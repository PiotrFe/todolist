import React from "react";

import "./nav-top.styles.scss";

import Icon from "../icon/icon.component";
import Slider from "../slider/slider.component";

import { IconTypes } from "../icon/icon.types";
import { Sizes, ActionTypes, ToDoFields } from "../../constants/constants";

const NavTop = ({
  listID,
  actions,
  dragModeOn,
  todosCount,
  todosCountPending,
  todosCountDone,
}) => {
  const sorts = [
    { field: ToDoFields.TITLE, sortDirection: 0 },
    { field: ToDoFields.DUE_DATE, sortDirection: 1 },
    { field: ToDoFields.OWNER, sortDirection: 0 },
    { field: ToDoFields.COLOR, sortDirection: 0 },
  ];

  const [sortTitle, sortDueDate, sortOwner, sortColor] = sorts;
  const { SORT } = ActionTypes;
  const { SORT_BOTH, SORT_ASC, SORT_DESC } = IconTypes;
  const sortDirection = {
    "0": SORT_BOTH,
    "1": SORT_ASC,
    "-1": SORT_DESC,
  };

  return (
    <header className="header-top">
      <div className="header-top__items">
        <div className="header-top__item header-top__item-box">
          <span className="header-top__item">Title</span>
          <Icon
            type={sortDirection[sortTitle.sortDirection]}
            parent={sortTitle.field}
            onClick={() => actions[SORT](listID, sortTitle.field)}
            size={Sizes.SMALL}
          />
        </div>
        <div className="header-top__item-box">
          <span className="header-top__item">Due date</span>
          <Icon
            type={sortDirection[sortDueDate.sortDirection]}
            parent={sortDueDate.field}
            onClick={() => actions[SORT](listID, sortDueDate.field)}
            size={Sizes.SMALL}
          />
        </div>
        <div className="header-top__item-box">
          <span className="header-top__item">Owner</span>
          <Icon
            type={sortDirection[sortOwner.sortDirection]}
            parent={sortOwner.field}
            onClick={() => actions[SORT](listID, sortOwner.field)}
            size={Sizes.SMALL}
          />
        </div>
        <div className="header-top__item-box">
          <span className="header-top__item">Color</span>
          <Icon
            type={sortDirection[sortColor.sortDirection]}
            parent={sortColor.field}
            onClick={() => actions[SORT](listID, sortColor.field)}
            size={Sizes.SMALL}
          />
        </div>
        {/* <div className="header-top__item-box">
  <span className="header-top__item">{`Total: ${todosCount}`}</span>
      </div>
      <div className="header-top__item-box">
        <span className="header-top__item">{`Pending: ${todosCountPending}`} </span>
      </div>
      <div className="header-top__item-box">
        <span className="header-top__item">{`Done: ${todosCountDone}`} </span>
      </div> */}
      </div>

      <div className="header-top__action-icons">
        <Slider toggle={actions[ActionTypes.DRAG]} dragModeOn={dragModeOn} />

        <Icon
          id={null}
          type={IconTypes.ADD}
          parent={null}
          onClick={listID, actions[ActionTypes.EDIT]}
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
    </header>
  );
};

export default NavTop;
