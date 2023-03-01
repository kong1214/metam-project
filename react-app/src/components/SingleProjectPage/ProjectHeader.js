import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import { getSingleProject } from "../../store/project";
import ProjectDropDownArrow from "./ProjectDropDownArrow";
import LeftNavBar from "../Navigation/LeftNavBar";
import "./SingleProjectPage.css"

function ProjectHeader({ project }) {

    let projectIcon
    if (project.project_icon === "chat_bubble") {
        projectIcon = (<i className="fa-solid fa-comment fa-lg"></i>)
    } else if (project.project_icon === "briefcase") {
        projectIcon = (<i className="fa-solid fa-briefcase fa-lg"></i>)
    } else if (project.project_icon === "monitor") {
        projectIcon = (<i className="fa-solid fa-desktop fa-lg"></i>)
    } else if (project.project_icon === "shoe") {
        projectIcon = (<i className="fa-solid fa-shoe-prints fa-lg"></i>)
    }

    let projectStatus
    if (project.project_status === "On Track") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle" style={{ color: "green", marginRight: "4px" }}></i>
                On Track
            </div>
        )
    } else if (project.project_status === "At Risk") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle"  style={{ color: "yellow", marginRight: "4px" }}></i>
                At Risk
            </div>
        )
    } else if (project.project_status === "Off Track") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle" style={{ color: "red", marginRight: "4px" }}></i>
                Off Track
            </div>
        )
    } else if (project.project_status === "On Hold") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle"  style={{ color: "blue", marginRight: "4px" }}></i>
                On Hold
            </div>
        )
    }
    return (
        <div className="single-project-header-nav-container">
            <div className="single-project-header-container">
                <div className="single-project-icon-name-container">
                    <div className="project-icon-container" style={{ marginRight: "1.5%" }}>
                        {projectIcon}
                    </div>
                    <div className="project-name-container" style={{ fontSize: "20px", marginRight: "1.5%" }}>
                        {project.project_name}
                    </div>
                    <div className="single-project-dropdown" style={{ marginRight: "1.5%" }}>
                        <ProjectDropDownArrow project={project} />
                    </div>
                    {projectStatus}
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader
