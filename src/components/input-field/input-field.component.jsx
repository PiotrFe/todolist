import React, { useState, useRef } from "react";

import Icon from "../icon/icon.component";
import Overlay from "../../components/overlay/overlay.component";
import { IconTypes } from "../icon/icon.types";
import { Components, Sizes, ActionTypes } from "../../constants/constants";

import "./input-field.styles.scss";

const InputField = ({ idx, size, actions, value, parent }) => {
  const textInput = useRef(null);
  const [overlayVisible, toggleOverlay] = useState(false);

  const focusInput = () => {
    textInput.current.focus();
  };

  const blurInput = () => {
    textInput.current.blur();
  };

  const conditionalInputProps = {
    ...(size === Sizes.LARGE && {
      onFocus() {
        if (!overlayVisible) toggleOverlay(!overlayVisible);
      }
    }),
    ...(size === Sizes.SMALL && {
      onBlur() {
        actions[ActionTypes.SUBMIT]({ idx: idx });
      }
    })
  };

  const conditionalFormProps = {
    ...(size === Sizes.LARGE && {
      onSubmit() {
        actions[ActionTypes.UPDATE]({ value: "" });
        toggleOverlay(!overlayVisible);
        blurInput();
      }
    })
  };

  return (
    <>
      <form
        action="/"
        className={`input-form input-form--${size}`}
        onSubmit={e => {
          e.preventDefault();
          actions[ActionTypes.SUBMIT]({ idx: idx, parent: parent });
          if (size === Sizes.LARGE) {
            conditionalFormProps.onSubmit();
          }
        }}
      >
        <div className="input-form-group">
          <input
            className={`input-field input-field--${size}`}
            type="text"
            ref={textInput}
            value={value}
            placeholder="Edit here"
            onChange={e =>
              actions[ActionTypes.UPDATE]({
                idx: idx,
                parent: parent,
                value: e.target.value
              })
            }
            {...conditionalInputProps}
          />
          <Icon
            idx={idx}
            type={IconTypes.BACKSPACE}
            onClick={() => {
              focusInput();
              actions[ActionTypes.UPDATE]({ idx: idx, parent: parent, value: "" });
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
    </>
  );
};

export default InputField;
