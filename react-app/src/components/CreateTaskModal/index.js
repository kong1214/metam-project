import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { createTask } from "../../store/task";


function CreateTaskFormModal({projectId}) {

    function dateFormatter(date) {
        const dateArr = date.split("/")
        return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
    }

    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [projectSection, setProjectSection] = useState("")
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    const today = new Date()
    const year = today.getUTCFullYear();
    let month = today.getUTCMonth() + 1;
    if (month < 10) {
      month = `0${month}`
    }
    const day = today.getUTCDate();
    const date = `${month}/${day}/${year}`;

    const dateParser = (date) => {
        const dateArr = date.split("-")
        return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            task_name: taskName,
            priority: priority,
            task_status: taskStatus,
            project_section: projectSection,
            description: description,
            due_date: dateParser(dueDate),
            created_at: date,
            updated_at: date
        }
        return dispatch(createTask(newTask, projectId))
        .then(() => closeModal())

    };

    return (
        <>
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label for="task-name-input">Task Name</label>
                <input
                    id="task-name-input"
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <label for="task-priority-dropdown">Task Priority</label>
                <select
                    id="task-priority-dropdown"
                    className="dropdown-create"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                >
                    <option value="">Select a priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <label for="task-status-dropdown">Task Status</label>
                <select
                    id="task-status-dropdown"
                    className="dropdown-create"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    required
                >
                    <option value="">Select a status</option>
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Off Track">Off Track</option>
                </select>
                <label for="task-project-section-dropdown">Project Section</label>
                <select
                    id="task-project-section-dropdown"
                    className="dropdown-create"
                    value={projectSection}
                    onChange={(e) => setProjectSection(e.target.value)}
                    required
                >
                    <option value="">Select a section</option>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <label for="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <label for="task-description-input">Task Description</label>
                <textarea
                    id="task-description-input"
                    type="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default CreateTaskFormModal;
