import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getAllProjects, getSingleProject } from "../../store/project";
import { Redirect, useHistory } from "react-router-dom";
import "./CreateProjectPage.css"
import screenshot from './project-screenshot.png'


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
    <div className="create-project-center-container">
      <div className="create-project-container">
        <div className="new-project-header">New Project</div>
        <form className="create-project-form-container" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div id="create-project-form-name-container" className="label-input-container">
            <label id="project-name-input-label" className="form-label">Project Name</label>
            <input
              id="project-name-input"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div id="create-project-icon-status-container">
            <div id="create-project-form-icon-container" className="label-input-container">
              <label id="project-icon-dropdown-label" className="form-label">Project Icon</label>
              <select
                id="project-icon-dropdown"
                className="dropdown-create"
                value={projectIcon}
                onChange={(e) => setProjectIcon(e.target.value)}
                required
              >
                <option value="">Select an icon</option>
                <option value="briefcase">Briefcase</option>
                <option value="chat_bubble">Chat Bubble</option>
                <option value="monitor">Monitor</option>
                <option value="shoe">Shoe</option>
              </select>
            </div>
            <div id="create-project-form-status-container" className="label-input-container">
              <label id="project-status-dropdown-label" className="form-label">Project Status</label>
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
            </div>
          </div>
          <div id="create-project-form-due-date-container" className="label-input-container">
            <label id="dueDate-label" className="form-label">Due Date</label>
            <input
              type="date"
              id="dueDate-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button id="create-project-button" type="submit">Create</button>
        </form>
      </div>
      {/* <img id="create-project-project-screenshot" src={screenshot}></img> */}
    </div>
  );
}

export default CreateProjectPage;
