import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import { ThemeContext } from "../../context/Themes";
import { SideBarVisibleContext } from "../../context/SideBarVisible";
import TeamList from "./TeamList";

function LeftNavBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const projects = useSelector(state => state.project.allProjects)
    const singleProject = useSelector(state => state.project.singleProject)
    const team = useSelector(state => state.team)
    const projectsArr = Object.values(projects)
    const [teamsAndProjectLoaded, setTeamsAndProjectLoaded] = useState(false);
    const { theme } = useContext(ThemeContext)
    const { sidebarVisible, setSidebarVisible, sidebarAbsolute } = useContext(SideBarVisibleContext)
    
    useEffect(() => {
        dispatch(getAllProjects())
    }, [projectsArr.length])

    useEffect(() => {
        setTeamsAndProjectLoaded(!!Object.values(team).length && !!Object.values(singleProject).length)
    })

    let closeSidebarHandler = () => {
        setSidebarVisible(false)
    }
    return (
        <div className="left-navbar-container" id="left-navbar-container" style={{ backgroundColor: theme["tertiary"], display: sidebarVisible ? "flex" : "none", position: sidebarAbsolute ? "fixed" : "static" }}>
            <div className="left-navbar-top-container">
            {sidebarAbsolute && (<div id="close-sidebar-div-container">
                    <button id="close-sidebar-button" onClick={closeSidebarHandler}>
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>)}
                <button style={{ backgroundColor: theme["active"] }} className="create-project-button-left-navbar-button" onClick={() => history.push("/project")}>
                    <NavLink to="/project" className="create-button-in-left-navbar">Create Project</NavLink>
                </button>
                <NavLink to="/home" activeStyle={{ backgroundColor: theme["active"] }} activeClassName="top-container-link-active" className="top-container-link">
                    <i className="fa-solid fa-house"></i>
                    Home
                </NavLink>
                {teamsAndProjectLoaded && (
                    <TeamList />
                )}
            </div>
            <div className="my-workspace-container">
                <div className="my-workspace-header">
                    My Workspace
                </div>
                <div className="projects-container">
                    {projectsArr.map(project => (
                        <div key={project.id} className="left-nav-individual-project">
                            <div className="individual-project-container">
                                <NavLink to={`/project/${project.id}`} activeStyle={{ backgroundColor: theme["active"] }} className="individual-project" activeClassName="individual-project-active">{project.name}</NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftNavBar
