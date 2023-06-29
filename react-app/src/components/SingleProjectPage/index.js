import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getSingleProject } from "../../store/project";
import { getAllSections, moveSection } from "../../store/section";
import { loadTeam } from "../../store/team";
import task, { getAllTasks, moveTask, clearTasks } from "../../store/task";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import LeftNavBar from "../Navigation/LeftNavBar";
import ProjectHeader from "./ProjectHeader";
import Section from "./Section";
import AddSection from "./AddSection";
import "./SingleProjectPage.css"

function SingleProjectPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    let sectionsObj = useSelector(state => state.section)
    let tasksObj = useSelector(state => state.task.allTasks)
    const [teamIsLoaded, setTeamIsLoaded] = useState(false)
    const [projectIsLoaded, setProjectIsLoaded] = useState(false)
    const [sectionsIsLoaded, setSectionsIsLoaded] = useState(false)
    const [sectionMoved, setSectionMoved] = useState(false)
    const [taskMoved, setTaskMoved] = useState(false)
    const { projectId } = useParams()

    useEffect(() => {
        dispatch(loadTeam(projectId))
            .then(() => setTeamIsLoaded(true))
    }, [dispatch, projectId])

    useEffect(() => {
        if (teamIsLoaded) {
            dispatch(getSingleProject(projectId))
                .then(() => setProjectIsLoaded(true))
        }
    }, [projectId, project.name, project.icon, project.status, teamIsLoaded])

    useEffect(() => {
        if (projectIsLoaded) {
            dispatch(getAllSections(projectId))
                .then(() => setSectionsIsLoaded(true))
        }
    }, [projectId, project.num_sections, projectIsLoaded, sectionMoved])

    useEffect(() => {
        if (sectionsIsLoaded) {
            dispatch(getAllTasks(projectId))
        }
    }, [projectId, project.num_tasks, sectionsIsLoaded, taskMoved])

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    // if (projectIsLoaded && !Object.values(project).length) return null;

    // if (projectIsLoaded && sessionUser.id !== project.owner_id) return (
    //     <Redirect to="/home" />
    // )

    const sections = Object.values(sectionsObj).sort((a, b) => a.order - b.order)
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

        // console.log("destination", destination)
        // console.log("source", source)
        // console.log("draggableId", draggableId)
        // console.log("type", type)

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === "task") {

            const taskId = +draggableId.split("-")[1]
            const sectionId = +destination.droppableId.split("-")[1]
            const order = destination.index + 1

            // check if destination section is empty
            const destinationSection = sections.find(section => section.id === sectionId)
            const tasksInDestinationSection = destinationSection.tasks

            // console.log("taskId", taskId)
            // console.log("sectionId", sectionId)
            // console.log("order", order)
            // console.log("destinationSection", destinationSection)
            // console.log("tasksInDestinationSection", tasksInDestinationSection)

            // if destination section is empty, set order to 1
            if (tasksInDestinationSection.length === 0) {
                dispatch(moveTask(taskId, 1, sectionId))
                setTaskMoved(!taskMoved)
                return
            } else {
                dispatch(moveTask(taskId, order, sectionId))
                setTaskMoved(!taskMoved)
            }
        }
        else if (type === "section") {
            const sectionId = +draggableId.split("-")[1]
            const order = destination.index + 1
            dispatch(moveSection(sectionId, order))
            setSectionMoved(!sectionMoved)
        }
    }


    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <ProjectHeader project={project} sections={sections}/>
                <div className="tasks-column-header">
                    <div className="task-name-container">Task Name</div>
                    <div className="assignee-item-header">Assignee</div>
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
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </DragDropContext>
                <AddSection projectId={projectId} />
            </div>
        </div>
    )
}

export default SingleProjectPage
