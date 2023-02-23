import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";


function LeftNavBar() {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <div className="left-navbar-container">
            <div className="left-navbar-top-container">
                <button className="create-project-button">Create Project</button>
                <NavLink to="/home">Home</NavLink>
            </div>
            <div className="my-workspace-container">
                <div className="my-workspace-header">
                    My Workspace
                </div>
                <div className="projects-container">
                    PROJECTS GO HERE
                </div>
            </div>
        </div>
    )
}

export default LeftNavBar
