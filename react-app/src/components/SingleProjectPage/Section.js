import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import SingleTask from "../TaskList/SingleTask";
import { Draggable, Droppable } from "react-beautiful-dnd"
import { getAllSections } from "../../store/section";
import { getAllTasks, clearTasks } from "../../store/task";


function Section({ section, tasks = [], index }) {


    function onDragEnd() {
        alert('dropped ')
    }
    const stringSectionId = `section-${(section.id).toString()}`

    return (
        <Draggable draggableId={stringSectionId} index={index} key={section.id}>
            {provided => (
                <div className="section-container" {...provided.draggableProps} ref={provided.innerRef}>
                    <div className="section-header">
                    <div className="drag-handle" {...provided.dragHandleProps}>
                        <i className="fa-solid fa-bars bars-icon" style={{marginRight: ".5em"}}></i>
                    </div>
                        {section.name}
                    </div>
                    {tasks.length === 0 ? (
                        <div> No tasks for this section </div>
                    ) : (
                        <Droppable droppableId={stringSectionId} type="task">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {tasks.map((task) => (
                                        <SingleTask key={task.id} task={task} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default Section
