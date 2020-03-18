import React, { useState, useRef } from "react";

import Icon from "../icon/icon.component";
import Overlay from "../../components/overlay/overlay.component";
import Aux from "../../components/hoc/auxiliary.component";
import { IconTypes } from "../icon/icon.types";
import { Components, Sizes, ActionTypes } from "../../constants/constants";

import "./input-field.styles.scss";

const InputField = ({ idx, size, actions, value }) => {
  const textInput = useRef(null);
  const [overlayVisible, toggleOverlay] = useState(false);

  const focusInput = () => {
    textInput.current.focus();
  };

  const conditionalProps = {
    ...(size === Sizes.LARGE && {
      onFocus() {
        if (!overlayVisible) toggleOverlay(!overlayVisible);
      },
      onSubmit() {
        actions.update(idx);
        toggleOverlay(!overlayVisible);
      }
    }),
    ...(size === Sizes.SMALL && {
      onBlur() {
        actions.submit(idx);
      }
    })
  };

  return (
    <Aux>
      <form
        action="/"
        className={`input-form input-form--${size}`}
        onSubmit={e => {
          e.preventDefault();
          actions.submit(idx);
          if (size === Sizes.LARGE) {
            conditionalProps.onSubmit();
          }
        }}
      >
        <div className="input-form-group">
          <input
            className={`input-field input-field--${size}`}
            type="text"
            value={value}
            placeholder="Edit here"
            onChange={e => actions.update(idx, e.target.value)}
            {...conditionalProps}
            ref={textInput}
          />
          <Icon
            idx={idx}
            type={IconTypes.BACKSPACE}
            onClick={() => {
              focusInput();
              actions.update(idx);
            }}
            parent={Components.INPUT_FIELD}
            size={size}
          />
        </div>
      </form>
      {size === Sizes.LARGE ? (
        <Overlay
          show={overlayVisible}
          onClick={() => toggleOverlay(!overlayVisible)}
        />
      ) : null}
    </Aux>
  );
};

export default InputField;
