import React from "react";
import SingleTask from "../TaskList/SingleTask";
import { Draggable, Droppable } from "react-beautiful-dnd"
import SectionDropDown from "./SectionDropDown";
import "./SingleProjectPage.css"

function Section({ section, tasks = [], index }) {

    const sortedTasks = tasks.sort((a, b) => a.order - b.order)


    const stringSectionId = `section-${(section.id).toString()}`

    return (
        <Draggable draggableId={stringSectionId} index={index} key={section.id} >
            {provided => (
                <div className="section-container" {...provided.draggableProps} ref={provided.innerRef}>
                    <div className="section-header">
                        <div className="drag-handle" {...provided.dragHandleProps}>
                            <i className="fa-solid fa-bars bars-icon" style={{ marginRight: ".5em" }}></i>
                        </div>
                        {section.name}
                        <div id="section-dropdown-ellipses">
                            <SectionDropDown section={section} />
                        </div>
                    </div>
                    {tasks.length === 0 ? (
                        <Droppable droppableId={stringSectionId} type="task">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} style={{marginBottom: "10px"}}>
                                    <div>This section is empty! Drop some tasks below!</div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ) : (
                        <Droppable droppableId={stringSectionId} type="task">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {sortedTasks.map((task, index) => (
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
