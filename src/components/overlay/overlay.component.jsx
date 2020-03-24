import React from "react";

import "./overlay.styles.scss";

const Overlay = ({ show, onClick, opaque, children }) => {
  return (
    <div
      className={`overlay overlay--${opaque ? "opaque" : "transparent"} overlay--show-${show}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
