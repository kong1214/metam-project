import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import SingleTask from "../TaskList/SingleTask";
import { getAllSections } from "../../store/section";
import { getAllTasks, clearTasks } from "../../store/task";


function Section({ section, tasks = []}) {

    console.log(`tasks for section ${section.id}`)
    console.log("tasks", tasks)
    return (
        <div className="section-container">
            <div className="section-header">{section.name}</div>
            {tasks.length === 0 ? (
                <div> No tasks for this section </div>
            ) : (
                tasks.map((task) => (
                    <SingleTask key={task.id} task={task} />
            )
            ))}
        </div>
    )
}

export default Section
