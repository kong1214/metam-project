import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import "./TaskList.css"

function SingleTask({ task }) {
    if(!task) {
        return (
            <div>There are no tasks in this section!</div>
        )
    }
    return (
        <div className="single-task-container">
            <div className="task-name">{task.task_name}</div>
            <div className="task-due-date">{task.due_date}</div>
            <div className="task-priority">{task.priority}</div>
            <div className="task-status">{task.task_status}</div>
        </div>
    )
}

export default SingleTask
