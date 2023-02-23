import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../Navigation/Navigation.css"

function SplashNav() {
    return (
        <div className="logged-out-navbar-container">
        <div style={{ color: "rgb(114, 114, 114)" }}>
            <NavLink exact to="/">metam</NavLink>
        </div>
        <div className="logged-out-nav-buttons-container">
            <button className="login-button nav-button">
                <NavLink exact to="/login">Log In</NavLink>
            </button>
            <button className="signup-button nav-button">
                <NavLink exact to="/signup">Get Started</NavLink>
            </button>
        </div>
    </div>
    )
}

export default SplashNav
