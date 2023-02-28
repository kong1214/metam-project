import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import SignUpFormModal from "../SignupFormModal"
import LoginFormModal from "../LoginFormModal"
import "../Navigation/Navigation.css"
import logo from "./logo.png"

function SplashNav() {
    const dispatch = useDispatch();
    const history = useHistory()
    const ulRef = useRef();


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
