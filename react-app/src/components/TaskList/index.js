import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import SingleTask from "./SingleTask";
import { getAllTasks, clearTasks } from "../../store/task";
import "./TaskList.css"

function TaskList({ projectIsLoaded, projectId }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    let tasksObj = useSelector(state => state.task.allTasks)

    useEffect(() => {
        dispatch(getAllTasks(projectId))
    }, [dispatch, Object.values(tasksObj).length, projectId])

    if (Object.values(tasksObj).length === 0) tasksObj = { task_error: "No task yet for this section" }
    let tasks = Object.values(tasksObj)
    let toDoTasks = []
    let doingTasks = []
    let doneTasks = []

    for (let task of tasks) {
        if (task.project_section === "To Do") {
            toDoTasks.push(task)
        } else if (task.project_section === "Doing") {
            doingTasks.push(task)
        } else if (task.project_section === "Done") {
            doneTasks.push(task)
        }
    }


    return (
        <>
            {projectIsLoaded && (
                <div className="single-project-body">
                    <div className="tasks-column-header">
                        <div className="task-name">Task Name</div>
                        <div className="task-due-date">Due Date</div>
                        <div className="task-priority-container">Priority</div>
                        <div className="task-status-container">Status</div>
                    </div>
                    <div className="to-do-container section-container">
                        <div className="to-do-header-container section-header">To do</div>
                        <div className="to-do-tasks-container">
                            {toDoTasks.map(task => (
                                <SingleTask task={task} />
                            ))}
                        </div>
                    </div>
                    <div className="doing-container section-container">
                        <div className="doing-header-container section-header">Doing</div>
                        <div className="doing-tasks-container">
                            {doingTasks.map(task => (
                                <SingleTask task={task} />
                            ))}
                        </div>
                    </div>
                    <div className="done-container section-container">
                        <div className="done-header-container section-header">Done</div>
                        <div className="done-tasks-container">
                            {doneTasks.map(task => (
                                <SingleTask task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TaskList
