import React from "react";
import ProjectDropDownArrow from "./ProjectDropDownArrow";
import ThemeButton from "../ThemeButton";
import "./SingleProjectPage.css"

function ProjectHeader({ project, sections }) {

    let projectIcon
    if (project.icon === "chat_bubble") {
        projectIcon = (<i className="fa-solid fa-comment fa-lg"></i>)
    } else if (project.icon === "briefcase") {
        projectIcon = (<i className="fa-solid fa-briefcase fa-lg"></i>)
    } else if (project.icon === "monitor") {
        projectIcon = (<i className="fa-solid fa-desktop fa-lg"></i>)
    } else if (project.icon === "shoe") {
        projectIcon = (<i className="fa-solid fa-shoe-prints fa-lg"></i>)
    }

    let projectStatus
    if (project.status === "On Track") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle" style={{ color: "green", marginRight: "4px" }}></i>
                On Track
            </div>
        )
    } else if (project.status === "At Risk") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle"  style={{ color: "yellow", marginRight: "4px" }}></i>
                At Risk
            </div>
        )
    } else if (project.status === "Off Track") {
        projectStatus = (
            <div className="project-status-container">
                <i className="fa-solid fa-circle" style={{ color: "red", marginRight: "4px" }}></i>
                Off Track
            </div>
        )
    } else if (project.status === "On Hold") {
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
                    <div className="project-name-container" style={{ fontSize: "20px", marginRight: ".5%" }}>
                        {project.name}
                    </div>
                    <div className="single-project-dropdown" style={{ marginRight: "1.5%" }}>
                        <ProjectDropDownArrow project={project} sections={sections}/>
                    </div>
                    {projectStatus}
                    <ThemeButton />
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader
