import React from "react";
import ReactDOM from "react-dom";

import LoadingSpinner from "../loading-spinner/loading-spinner.component";

import "./overlay.styles.scss";

const Overlay = ({ children, show = true, onClick = null, opaque = true, withSpinner = false }) => {
  const modalRoot = document.getElementById("modal-root");

  return (
    show &&
    ReactDOM.createPortal(
      <div
        className={`overlay overlay--${
          opaque ? "opaque" : "transparent"
        } overlay--show-${show}`}
        onClick={onClick}
      >
        {withSpinner && <LoadingSpinner />}
        {children}
      </div>,
      modalRoot
    )
  );
};

export default Overlay;
