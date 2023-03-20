import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import SingleTask from "./SingleTask";
import { getAllSections } from "../../store/section";
import { getAllTasks, clearTasks } from "../../store/task";
import "./TaskList.css"

function TaskList({ projectIsLoaded, projectId, numSections }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    const sectionsObj = useSelector(state => state.section)
    const [sectionsLoaded, setSectionsLoaded] = useState(false);
    let tasksObj = useSelector(state => state.task.allTasks)

    useEffect(() => {
        setSectionsLoaded(false)
        dispatch(getAllSections(projectId))
        setSectionsLoaded(true)
    }, [numSections, projectId])

    useEffect(() => {
        if (sectionsLoaded) {
            dispatch(getAllTasks(projectId))
        }
    }, [Object.values(tasksObj).length, sectionsLoaded, projectId])

    if (Object.values(sectionsObj).length === 0) return null
    if (Object.values(tasksObj).length === 0) return null;
    let tasks = Object.values(tasksObj)
    let sections = Object.values(sectionsObj)

    let parsedSectionsAndTasks = {}
    for (const section of sections) {
        parsedSectionsAndTasks[section.name] = []
    }
    for (const task of tasks) {
        parsedSectionsAndTasks[task.section.name].push(task)
    }

    let toDoTasks = []
    let doingTasks = []
    let doneTasks = []

    for (let task of tasks) {
        if (task.project_section === "To do") {
            toDoTasks.push(task)
        } else if (task.project_section === "Doing") {
            doingTasks.push(task)
        } else if (task.project_section === "Done") {
            doneTasks.push(task)
        }
    }

    function onDragEnd() {
        alert('dropped ')
    }

    return (
        <>
            {projectIsLoaded && (
                <div className="single-project-body">
                    <div className="tasks-column-header">
                        <div className="task-name-container">Task Name</div>
                        <div className="task-due-date">Due Date</div>
                        <div className="task-priority-container">Priority</div>
                        <div className="task-status-container">Status</div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="all-sections" direction="vertical" type="row">
                            {provided => (
                                <div className="section-container" {...provided.droppableProps} ref={provided.innerRef}>
                                    {sections.map(section => (
                                        <div>{section.name}</div>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </>
    )
}

export default TaskList
