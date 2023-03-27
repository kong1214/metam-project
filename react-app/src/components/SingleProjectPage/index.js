import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getSingleProject } from "../../store/project";
import { getAllSections } from "../../store/section";
import task, { getAllTasks, moveTask, clearTasks } from "../../store/task";

import { DragDropContext, Droppable } from "react-beautiful-dnd"
import LeftNavBar from "../Navigation/LeftNavBar";
import ProjectHeader from "./ProjectHeader";
import Section from "./Section";
import "./SingleProjectPage.css"

function SingleProjectPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    let sectionsObj = useSelector(state => state.section)
    let tasksObj = useSelector(state => state.task.allTasks)
    const [projectIsLoaded, setProjectIsLoaded] = useState(false)
    const [sectionsIsLoaded, setSectionsIsLoaded] = useState(false)
    const [taskMoved, setTaskMoved] = useState(false)
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
    }, [project.num_tasks, sectionsIsLoaded, projectId, taskMoved])

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    // if (projectIsLoaded && !Object.values(project).length) return null;

    // if (projectIsLoaded && sessionUser.id !== project.owner_id) return (
    //     <Redirect to="/home" />
    // )

    const sections = Object.values(sectionsObj)
    const tasks = Object.values(tasksObj)

    const parsedTasks = {}
    tasks.forEach(task => {
        if (!parsedTasks[task.section_id]) {
            parsedTasks[task.section_id] = []
            parsedTasks[task.section_id].push(task)
        } else parsedTasks[task.section_id].push(task)
    })

    function onDragEnd(result) {
        const { destination, source, draggableId, type } = result;

        console.log("destination", destination)
        console.log("source", source)
        console.log("draggableId", draggableId)
        console.log("type", type)

        if (!destination) {
            return;
        }
        if (type === "task") {
            const taskId = +draggableId.split("-")[1]
            const sectionId = +destination.droppableId.split("-")[1]
            const order = destination.index + 1
            dispatch(moveTask(taskId, order, sectionId))
            setTaskMoved(!taskMoved)
        }
    }

    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <ProjectHeader project={project} />
                <div className="tasks-column-header">
                    <div className="task-name-container">Task Name</div>
                    <div className="task-due-date">Due Date</div>
                    <div className="task-priority-container">Priority</div>
                    <div className="task-status-container">Status</div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    {sections.length === 0 ? (
                        <div>No Sections Yet!</div>
                    ) : (
                        <Droppable droppableId="sections" type="section">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {sections.map((section, index) => (
                                        <Section
                                            key={section.id}
                                            section={section}
                                            tasks={parsedTasks[section.id] || []}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    )}
                </DragDropContext>
            </div>
        </div>
    )
}

export default SingleProjectPage
