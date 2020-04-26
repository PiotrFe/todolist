import React from "react";

import "./nav-top.styles.scss";

import Icon from "../icon/icon.component";

import { IconTypes } from "../icon/icon.types";
import { Sizes, Components, ActionTypes } from "../../constants/constants";

const NavTop = ({sorts, actions}) => {

  const [sortTitle, sortDueDate, sortOwner ] = sorts;

  return (
  <header className="header-top">
    <div className="header-top__items">
      <div className="header-top__item-box">
        <span className="header-top__item-title">Title</span>
        <Icon
          id={sortTitle.column}
          type={sortTitle.sortDirection}
          parent={sortTitle.column}
          onClick={actions[ActionTypes.SORT]}
          size={Sizes.SMALL}
        />
      </div>
      <div className="header-top__item-box">
        <span className="header-top__item-title">Due date</span>
        <Icon
          id={sortDueDate.column}
          type={sortDueDate.sortDirection}
          parent={sortDueDate.column}
          onClick={actions[ActionTypes.SORT]}
          size={Sizes.SMALL}
        />
      </div>
      <div className="header-top__item-box">
        <span className="header-top__item-title">Owner</span>
        <Icon
          id={sortOwner.column}
          type={sortOwner.sortDirection}
          parent={sortOwner.column}
          onClick={actions[ActionTypes.SORT]}
          size={Sizes.SMALL}
        />
      </div>
    </div>


    <div className="header-top__action-icons">
      <Icon
        id={null}
        type={IconTypes.ADD}
        parent={null}
        onClick={actions[ActionTypes.EDIT]}
        size={Sizes.SMALL}
      />
      <Icon
        id={null}
        type={IconTypes.SEARCH}
        parent={null}
        onClick={null}
        size={Sizes.SMALL}
      />
    </div>
  </header>
  );
};

export default NavTop;
