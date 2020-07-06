import React from "react";

import "./user-logo.styles.scss";

const UserLogo = ({ initials, ...otherProps }) => (
  <div className="user-logo" {...otherProps}>
    {initials}{" "}
  </div>
);

export default UserLogo;
