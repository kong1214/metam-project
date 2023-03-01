import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import TaskDropDownArrow from "./TaskDropDownArrow";
import "./TaskList.css"

function SingleTask({ task }) {
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


    return (
        <div className="single-task-container">
            <div className="task-name-container">
                <div className="dropdown">
                    <div className="task-name">{task.task_name}</div>
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
            <div className="task-due-date">{task.due_date}</div>
            <div className={"task-priority-container" + ` ${task.priority}`}>
                <div className={`task-priority-outer-pill-${task.priority}`}>
                    {task.priority}
                </div>
            </div>
            <div className={"task-status-container"}>
                <div className={`task-status-outer-pill-${task.task_status}`}>
                    {task.task_status}
                </div>
            </div>
        </div>
    )
}

export default SingleTask
