import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function EditProjectFormModal({ project }) {

    function dateFormatter(date) {
        const dateArr = date.split("/")
        return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
    }

    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState(project.project_name);
    const [projectIcon, setProjectIcon] = useState(project.project_icon);
    const [projectStatus, setProjectStatus] = useState(project.project_status);
    const [errors, setErrors] = useState([]);
    const [dueDate, setDueDate] = useState(dateFormatter(project.due_date));
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (data) {
        //   setErrors(data);
        // } else {
        //     closeModal()
        // }
    };

    return (
        <>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label for="project-name-input">Project Name</label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
                <label for="project-icon-dropdown">Project Icon</label>
                <select
                    id="project-icon-dropdown"
                    className="dropdown-create"
                    value={projectIcon}
                    onChange={(e) => setProjectIcon(e.target.value)}
                    required
                >
                    <option value="">Select an icon</option>
                    <option value="briefcase">*briefcase icon*</option>
                    <option value="chat_bubble">*chat_bubble icon*</option>
                    <option value="monitor">*monitor icon*</option>
                    <option value="shoe">*shoe icon*</option>
                </select>
                <label for="project-status-dropdown">Project Status</label>
                <select
                    id="project-status-dropdown"
                    className="dropdown-create"
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    required
                >
                    <option value="">Select a status</option>
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Off Track">Off Track</option>
                    <option value="On Hold">On Hold</option>
                </select>
                <label for="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default EditProjectFormModal;
