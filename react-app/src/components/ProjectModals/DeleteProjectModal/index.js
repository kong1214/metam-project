import React from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../store/project";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./DeleteProjectModal.css"

function DeleteProjectModal({ project }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = async () => {

    return dispatch(deleteProject(project.id))
      .then(() => closeModal())
      .then(() => history.push("/home"))
  }

  return (
    <div id="delete-modal-container">
      <div className="delete-modal-header">
        Delete Project:
        <div className="delete-modal-deletion-important">
          <strong>{project.name}</strong>?
        </div>
      </div>
      <div className="delete-project-content-container">
        <div id="delete-project-warning">This will delete the project, along with any:</div>
        <li className="each-deletion">Sections that are in this project</li>
        <li className="each-deletion">Tasks that are in this project</li>
      </div>
      <div className="delete-modal-buttons">
        <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
        <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
