import React from "react";

import "./header.styles.scss";

const Header = () => (
    <header className="header">
        <p className="header-logo">To-do items manager</p>
        <ul className="header-list">
            <li className="header-item">Current to-dos</li>
            <li className="header-item">My lists</li>
            <li className="header-item">Templates</li>
            <li className="header-item">Log out</li>
        </ul>
    </header>
)

export default Header;