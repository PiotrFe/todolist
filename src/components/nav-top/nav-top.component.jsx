import React from "react";

import "./nav-top.styles.scss";

import Icon from "../icon/icon.component";

import { IconTypes } from "../icon/icon.types";
import { Sizes, ActionTypes, ToDoFields } from "../../constants/constants";

const NavTop = ({
  listID,
  actions,
  dragModeOn,
  sorts,
  todosCount,
  todosCountPending,
  todosCountDone,
}) => {
  const { TITLE, DUE_DATE, OWNER, COLOR } = ToDoFields;
  const { SORT } = ActionTypes;
  const { SORT_BOTH, SORT_ASC, SORT_DESC } = IconTypes;

  const sortDirection = {
    "0": SORT_BOTH,
    "1": SORT_ASC,
    "-1": SORT_DESC,
  };

  console.log(JSON.stringify(sorts));


  return (
    <header className="header-top">
      <div className="header-top__items">
        <div className="header-top__item-box">
          <span className="header-top__item">Title</span>
          <Icon
            type={sortDirection[sorts[TITLE]]}
            onClick={() => actions[SORT](listID, TITLE)}
            size={Sizes.SMALL}
          />
        </div>
        <div className="header-top__item-box">
          <span className="header-top__item">Due date</span>
          <Icon
            type={sortDirection[sorts[DUE_DATE]]}
            onClick={() => actions[SORT](listID, DUE_DATE)}
            size={Sizes.SMALL}
          />
        </div>
        <div className="header-top__item-box">
          <span className="header-top__item">Owner</span>
          <Icon
            type={sortDirection[sorts[OWNER]]}
            onClick={() => actions[SORT](listID, OWNER)}
            size={Sizes.SMALL}
          />
        </div>
        <div className="header-top__item-box">
          <span className="header-top__item">Color</span>
          <Icon
            type={sortDirection[sorts[COLOR]]}
            onClick={() => actions[SORT](listID, COLOR)}
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


    </header>
  );
};

export default NavTop;
