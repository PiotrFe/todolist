import React from "react";
import { Link } from "react-router-dom";

import ButtonToggle from "../button-toggle/button-toggle.component";
import FloatingMenu from "../floating-menu/floating-menu.component";

import "./header.styles.scss";

const Header = () => (
    <>
    <FloatingMenu />
    <header className="header">
        <p className="header-logo">To-do items manager</p>
        <ul className="header-list">
            <li className="header-item"><Link to="/" className="header-item__link">Home</Link></li>
            <li className="header-item"> <Link to="/user" className="header-item__link">My lists</Link></li>
            <li className="header-item"><Link to="/templates" className="header-item__link">My templates</Link></li>
            <li className="header-item">Log out</li>
        </ul>
    </header>
    </>
)

export default Header;