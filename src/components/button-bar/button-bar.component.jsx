import React from "react";

import { Toggle, IconButton, Icon } from "rsuite";

const ButtonBar = ({ actions }) => (
  <>
    <Toggle
      size="md"
      checkedChildren="Ready"
      unCheckedChildren="Sort"
      color="cyan"
      onChange={actions.toggleDrag}
    />
    <IconButton
      icon={<Icon icon="plus-square" />}
      color="cyan"
      size="sm"
      onClick={actions.toggleEditMode}
    />
    <IconButton
      icon={<Icon icon="download2" />}
      color="cyan"
      size="sm"
      onClick={actions.handleCSVDownload}
    />
    <IconButton
      icon={<Icon icon="trash2" />}
      color="cyan"
      size="sm"
      onClick={actions.handleRemoveList}
    />
    <IconButton
      icon={<Icon icon="refresh2" />}
      color="cyan"
      size="sm"
      onClick={actions.handleRefreshView}
    />
  </>
);

export default ButtonBar;
