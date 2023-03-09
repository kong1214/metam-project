import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getSingleProject } from "../../store/project";
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
    }, [projectId, project.name, project.icon, project.status])



    if (!sessionUser) return (
        <Redirect to="/" />
    )

    if (projectIsLoaded && !Object.values(project).length) return null;

    if (projectIsLoaded && sessionUser.id !== project.owner_id) return (
        <Redirect to="/home" />
    )

    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <ProjectHeader project={project} />
                {projectIsLoaded && <TaskList projectIsLoaded={projectIsLoaded} projectId={projectId} numSections={project.num_sections}/>}
            </div>
        </div>
    )
}

export default SingleProjectPage
