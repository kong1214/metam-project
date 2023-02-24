import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { getAllProjects } from "../../store/project";


function LeftNavBar() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.project.allProjects)
    const projectsArr = Object.values(projects)

    useEffect(() => {
        dispatch(getAllProjects())
    }, [dispatch, projectsArr.length])

    return (
        <div className="left-navbar-container">
            <div className="left-navbar-top-container">
                <button className="create-project-button">
                    <NavLink to="/project">Create Project</NavLink>
                </button>
                <NavLink to="/home">Home</NavLink>
            </div>
            <div className="my-workspace-container">
                <div className="my-workspace-header">
                    My Workspace
                </div>
                <div className="projects-container">
                    {projectsArr.map(project => (
                        <div>
                            <NavLink to={`/project/${project.id}`} className="individual-project">{project.project_name}</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftNavBar
