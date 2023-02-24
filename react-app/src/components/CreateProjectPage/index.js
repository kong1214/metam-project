import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getAllProjects, getSingleProject } from "../../store/project";
import { Redirect, useHistory } from "react-router-dom";

function CreateProjectPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [projectName, setProjectName] = useState("");
  const [projectIcon, setProjectIcon] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [errors, setErrors] = useState([]);
  const [dueDate, setDueDate] = useState({});


  const today = new Date();
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
    console.log(dueDate)

    const newProject = {
      project_name: projectName,
      project_icon: projectIcon,
      project_status: projectStatus,
      due_date: dateParser(dueDate),
      created_at: date,
      updated_at: date
    }
    return await dispatch(createProject(newProject))
    .then(async (res) => {
      const thisProject = await dispatch(getSingleProject(res.id))
      return thisProject
    })
    .then(async (res) => {
      await history.push(`/project/${res.project.id}`)
    })
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

export default CreateProjectPage;
