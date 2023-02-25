import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { getSingleProject } from "../../store/project";
import { getAllTasks } from "../../store/task";
import DropDownArrow from "./DropDownArrow";
import LeftNavBar from "../Navigation/LeftNavBar";
import ProjectHeader from "./ProjectHeader";
import TaskList from "../TaskList";
import "./SingleProjectPage.css"

function SingleProjectPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    const [projectIsLoaded, setProjectIsLoaded] = useState(false)
    const { projectId } = useParams()

    useEffect(() => {
        dispatch(getSingleProject(projectId))
        .then(() => setProjectIsLoaded(true))
    }, [dispatch, projectId, project.project_name, project.project_icon, project.project_status])




    if (!sessionUser) return null;
    if (!project) return null;

    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <ProjectHeader project={project} />
                <TaskList projectIsLoaded={projectIsLoaded} projectId={projectId}/>
            </div>
        </div>
    )
}

export default SingleProjectPage
