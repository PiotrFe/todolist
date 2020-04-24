import React from "react";

import "./floating-menu.styles.scss";

const FloatingMenu = () => {
    return (
        <>
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>
            <label for="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>
        </div>
        </>
    )

}

export default FloatingMenu;