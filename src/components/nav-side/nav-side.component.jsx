import React, { useState } from "react";
import { Sidenav, Toggle, Nav, Icon } from "rsuite";

const NavSide = ({ toggleCockpit, addList }) => {
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
              onClick={addList}
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

export default NavSide;
