import React from "react";

import { Toggle, IconButton, Icon } from "rsuite";

import "./button-bar.styles.scss";

const ButtonBar = ({ actions }) => (
  <div className="button-bar">
    <Toggle
      size="md"
      checkedChildren="Ready"
      unCheckedChildren="Sort"
      color="cyan"
      onChange={actions.toggleDrag}
    />
    <IconButton
      icon={<Icon icon="plus" />}
      appearance="ghost"
      size="sm"
      onClick={actions.toggleEditMode}
    />
    <IconButton
      icon={<Icon icon="download2" />}
      appearance="ghost"
      // color="green"
      size="sm"
      onClick={actions.handleCSVDownload}
    />
    <IconButton
      icon={<Icon icon="trash2" />}
      appearance="ghost"
      // color="cyan"
      size="sm"
      onClick={actions.handleRemoveList}
    />
    <IconButton
      icon={<Icon icon="refresh2" />}
      appearance="ghost"
      // color="cyan"
      size="sm"
      onClick={actions.handleRefreshView}
    />
  </div>
);

export default ButtonBar;
