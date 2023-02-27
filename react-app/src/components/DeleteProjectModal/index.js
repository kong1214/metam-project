import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../store/project";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

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
    <div className="delete-modal-container">
      <div className="delete-modal-header">Delete the Project?</div>
      <ul> This will delete the project, along with any:
        <li>Tasks that are only in this project</li>
      </ul>
      <div className="delete-modal-buttons">

        <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
        <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
