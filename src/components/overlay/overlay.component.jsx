import React from "react";

import "./overlay.styles.scss";

const Overlay = ({ show, onClick }) => {
  return (
    <div
      className={`overlay overlay--show-${show}`}
      onClick={onClick}
    >
    </div>
  );
};

export default Overlay;
