import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import { getSingleProject } from "../../store/project";
import LeftNavBar from "../Navigation/LeftNavBar";
import "./SingleProjectPage.css"

function SingleProjectPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    const { projectId } = useParams()

    useEffect(() => {
        dispatch(getSingleProject(projectId))
    }, [dispatch, projectId])

    if (!sessionUser) return null;
    if (!project) return null;

    let projectIcon
    if (project.project_icon === "chat_bubble") {
        projectIcon = (<i class="fa-solid fa-comment fa-lg"></i>)
    } else if (project.project_icon === "briefcase") {
        projectIcon = (<i class="fa-solid fa-briefcase fa-lg"></i>)
    } else if (project.project_icon === "monitor") {
        projectIcon = (<i class="fa-solid fa-desktop fa-lg"></i>)
    } else if (project.project_icon === "shoe") {
        projectIcon = (<i class="fa-solid fa-shoe-prints fa-lg"></i>)
    }

    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <div className="single-project-header-nav-container">
                    <div className="single-project-header-container">
                        <div className="single-project-icon-name-container">
                            <div className="project-icon-container" style={{ marginRight: "1.5%" }}>
                                {projectIcon}
                            </div>
                            <div className="project-name-container" style={{ fontSize: "20px", marginRight: "1.5%" }}>
                                {project.project_name}
                            </div>
                            <div className="single-project-dropdown">
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-project-body"></div>
            </div>
        </div>
    )
}

export default SingleProjectPage
