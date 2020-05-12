import React, {useRef} from "react";

import "./slider.styles.scss";

const Slider = ({toggle, dragModeOn}) => {

  const checkboxRef = useRef();
  
  return (
    <label className="slider-switch" onClick={(e) => {
      e.preventDefault();
      const checkbox = checkboxRef.current;
      const checked = checkbox.checked;
      checkbox.checked = !checked;
      toggle(!checked);

    }}>
      <input type="checkbox" className="slider-checkbox" ref={checkboxRef}/>
      <span className="slider"></span>
    </label>
  );
};

export default Slider;
