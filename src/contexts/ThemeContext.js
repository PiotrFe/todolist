import React, { useState, useLayoutEffect } from "react";
import {Themes} from "../constants/constants";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {}
});

export default ThemeContext;

export function ThemeProvider(props) {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    setDark(!dark);
    window.localStorage.setItem("darkTheme", !dark);
  };

 let themeType = dark ? Themes.DARK : Themes.LIGHT;

  return (
    <ThemeContext.Provider value={{themeType, toggle}}>
      {props.children}
    </ThemeContext.Provider>
  );
}
