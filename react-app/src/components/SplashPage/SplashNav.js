import React from "react";
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import SignUpFormModal from "../SignupFormModal"
import LoginFormModal from "../LoginFormModal"
import "../Navigation/Navigation.css"
import logo from "./splash-images/logo.png"

function SplashNav() {

    return (
        <div className="logged-out-navbar-container">
            <div className="home-button-container">
                <NavLink exact to="/">
                    <img className="nav-logo" src={logo}></img>
                    <div id="metam-splash-nav">metam</div>
                </NavLink>
            </div>
            <div className="logged-out-nav-buttons-container">
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    className="splash-login-button"
                />
                <OpenModalButton
                    buttonText="Get Started"
                    modalComponent={<SignUpFormModal />}
                    className="splash-signup-button"
                />
            </div>
        </div>
    )
}

export default SplashNav
