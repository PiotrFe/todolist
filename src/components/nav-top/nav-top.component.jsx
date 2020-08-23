import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Icon from "../icon/icon.component";
// import { SortAscendingOutlined } from "@ant-design/icons";

import { IconTypes } from "../icon/icon.types";

import { Sizes, ActionTypes, ToDoFields } from "../../constants/constants";

import { selectSorts } from "../../redux/sorts/sorts.selectors";

import "./nav-top.styles.scss";

const NavTop = ({ listID, actions, sorts }) => {
  const { TITLE, DUE_DATE, OWNER, COLOR } = ToDoFields;
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
        <div
          className={`header-top__item-box ${
            sorts[TITLE] !== 0 ? "header-top__item-box--sorted" : 0
          } `}
        >
          <span className={`header-top__item`}>Title</span>
          <Icon
            type={sortDirection[sorts[TITLE]]}
            onClick={() => actions[SORT](sorts, TITLE)}
            size={Sizes.SMALL}
          />
          {/* <SortAscendingOutlined /> */}
        </div>
        <div
          className={`header-top__item-box ${
            sorts[DUE_DATE] !== 0 ? "header-top__item-box--sorted" : 0
          } `}
        >
          <span className={`header-top__item`}>Due date</span>
          <Icon
            type={sortDirection[sorts[DUE_DATE]]}
            onClick={() => actions[SORT](sorts, DUE_DATE)}
            size={Sizes.SMALL}
          />
        </div>
        <div
          className={`header-top__item-box ${
            sorts[OWNER] !== 0 ? "header-top__item-box--sorted" : 0
          } `}
        >
          <span className={`header-top__item`}>Owner</span>
          <Icon
            type={sortDirection[sorts[OWNER]]}
            onClick={() => actions[SORT](sorts, OWNER)}
            size={Sizes.SMALL}
          />
        </div>
        <div
          className={`header-top__item-box ${
            sorts[COLOR] !== 0 ? "header-top__item-box--sorted" : 0
          } `}
        >
          <span className={`header-top__item`}>Color</span>
          <Icon
            type={sortDirection[sorts[COLOR]]}
            onClick={() => actions[SORT](sorts, COLOR)}
            size={Sizes.SMALL}
          />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  sorts: selectSorts,
});

export default connect(mapStateToProps)(NavTop);
