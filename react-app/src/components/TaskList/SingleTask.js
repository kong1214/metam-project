import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd"
import TaskAssignee from "./TaskAssignee";
import TaskDropDownArrow from "./TaskDropDownArrow";
import "./TaskList.css"

function SingleTask({ task, index }) {
    const project = useSelector(state => state.project.singleProject)

    let assignee = project.users.filter(user => user.id === task.assignee_id)[0]
    if (!assignee) {
        assignee= "No Assignee!"
    }
    if (!task) {
        return (
            <div>There are no tasks in this section!</div>
        )
    }

    const dropdowns = document.querySelectorAll('.dropdown')
    if (dropdowns) {

        dropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.task-name')
            const menu = dropdown.querySelector('.task-description-dropdown')

            trigger.addEventListener('mouseover', () => {
                menu.style.display = 'block';
            });

            dropdown.addEventListener('mouseleave', () => {
                menu.style.display = 'none';
            });
        })
    }

    const stringTaskId = `task-${(task.id).toString()}`

    return (
        <Draggable draggableId={stringTaskId} index={index} key={task.id}>
            {provided => (
                <div className="single-task-container" ref={provided.innerRef} {...provided.draggableProps}>
                    <div className="drag-handle" {...provided.dragHandleProps}>
                        <i className="fa-solid fa-bars bars-icon"></i>
                    </div>
                    <div className="task-name-container">
                        <div className="description-dropdown">
                            <div className="task-name">{task.name}</div>
                            <div className="task-description-dropdown">
                                <div id="description-header">Description</div>
                                <div id="task-description">
                                    {task.description}
                                </div>
                            </div>
                        </div>
                        <div className="task-drop-down-arrow">
                            <TaskDropDownArrow task={task} />
                        </div>
                    </div>
                    <TaskAssignee assignee={assignee} users={project.users}/>
                    <div className="task-due-date">{task.due_date}</div>
                    <div className={"task-priority-container" + ` ${task.priority}`}>
                        <div className={`task-priority-outer-pill-${task.priority}`}>
                            {task.priority}
                        </div>
                    </div>
                    <div className={"task-status-container"}>
                        <div className={`task-status-outer-pill-${task.status}`}>
                            {task.status}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default SingleTask
