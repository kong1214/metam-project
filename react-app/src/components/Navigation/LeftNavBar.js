import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import TeamList from "./TeamList";

function LeftNavBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.project.allProjects)
    const singleProject = useSelector(state => state.project.singleProject)
    const team = useSelector(state => state.team)
    const projectsArr = Object.values(projects)
    const [teamsAndProjectLoaded, setTeamsAndProjectLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllProjects())
    }, [projectsArr.length])

    useEffect(() => {
        setTeamsAndProjectLoaded(!!Object.values(team).length && !!Object.values(singleProject).length)
    })


    return (
        <div className="left-navbar-container">
            <div className="left-navbar-top-container">
                <button className="create-project-button-left-navbar-button" onClick={() => history.push("/project")}>
                    <NavLink to="/project">Create Project</NavLink>
                </button>
                <NavLink to="/home" activeClassName="top-container-link-active" className="top-container-link">
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
                        <div className="left-nav-individual-project">
                            <div className="individual-project-container">
                                <NavLink to={`/project/${project.id}`} className="individual-project" activeClassName="individual-project-active">{project.name}</NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftNavBar
