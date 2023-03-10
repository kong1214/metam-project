import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getSingleProject } from "../../store/project";
import { getAllSections } from "../../store/section";
import { getAllTasks, clearTasks } from "../../store/task";
import LeftNavBar from "../Navigation/LeftNavBar";
import ProjectHeader from "./ProjectHeader";
import Section from "./Section";
import TaskList from "../TaskList";
import "./SingleProjectPage.css"

function SingleProjectPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    let sectionsObj = useSelector(state => state.section)
    let tasksObj = useSelector(state => state.task.allTasks)
    const [projectIsLoaded, setProjectIsLoaded] = useState(false)
    const [sectionsIsLoaded, setSectionsIsLoaded] = useState(false)
    const { projectId } = useParams()

    useEffect(() => {
        dispatch(getSingleProject(projectId))
            .then(() => setProjectIsLoaded(true))
    }, [projectId, project.name, project.icon, project.status])

    useEffect(() => {
        if (projectIsLoaded) {
            dispatch(getAllSections(projectId))
                .then(() => setSectionsIsLoaded(true))
        }
    }, [project.num_sections, projectId, projectIsLoaded])

    useEffect(() => {
        if (sectionsIsLoaded) {
            dispatch(getAllTasks(projectId))
        }
    }, [project.num_tasks, sectionsIsLoaded, projectId])

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    if (projectIsLoaded && !Object.values(project).length) return null;

    if (projectIsLoaded && sessionUser.id !== project.owner_id) return (
        <Redirect to="/home" />
    )

    if (!Object.values(sectionsObj).length) return null
    const sections = Object.values(sectionsObj)
    const tasks = Object.values(tasksObj)

    const parsedTasks = {}
    tasks.forEach(task => {
        if (!parsedTasks[task.section_id]) {
            parsedTasks[task.section_id] = []
            parsedTasks[task.section_id].push(task)
        } else parsedTasks[task.section_id].push(task)
    })

    console.log("parsedTasks", parsedTasks)
    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <ProjectHeader project={project}/>
                <div className="tasks-column-header">
                    <div className="task-name-container">Task Name</div>
                    <div className="task-due-date">Due Date</div>
                    <div className="task-priority-container">Priority</div>
                    <div className="task-status-container">Status</div>
                </div>
                {sections.length === 0 ? (
                    <div>No Sections Yet!</div>
                ) : (
                    sections.map((section) => (
                        <Section key={section.id} section={section} tasks={parsedTasks[section.id] || []} />
                )
                ))}
            </div>
        </div>
    )
}

export default SingleProjectPage
