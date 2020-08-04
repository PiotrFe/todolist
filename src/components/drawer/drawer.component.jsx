import React, { useState } from "react";
import { Drawer } from "rsuite";

export default ({
  children,
  toggleCockpit,
  size = "xs",
  show = true,
  placement = "left",
  title,
}) => (
  <Drawer
    size={size}
    placement={placement}
    show={show}
    onHide={() => toggleCockpit()}
  >
    <Drawer.Header>
      <Drawer.Title>{title}</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>{children}</Drawer.Body>
  </Drawer>
);
