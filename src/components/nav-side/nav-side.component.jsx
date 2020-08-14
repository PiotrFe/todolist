import React, { useState } from "react";
import {connect} from "react-redux";

import { Sidenav, Toggle, Nav, Icon } from "rsuite";

import { toggleAddListMode } from "../../redux/todo-lists-container/todo-lists-container.actions"

const NavSide = ({ toggleCockpit, toggleAddListMode }) => {
  const [expanded, handleToggle] = useState(true);

  return (
    <div style={{ width: 250 }}>
      <Toggle onChange={() => handleToggle(!expanded)} checked={expanded} />
      <hr />
      <Sidenav
        expanded={expanded}
        defaultOpenKeys={["3", "4"]}
        activeKey={null}
        onSelect={null}
      >
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              eventKey="1"
              onClick={toggleCockpit}
              icon={<Icon icon="dashboard" />}
            >
              Cockit
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              onClick={toggleAddListMode}
              icon={<Icon icon="plus" />}
            >
              New List
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleAddListMode: () => dispatch(toggleAddListMode())
})

export default connect(null, mapDispatchToProps)(NavSide)
