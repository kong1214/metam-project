import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../store/project";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

function DeleteProjectModal({project}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = async () => {
    
    return dispatch(deleteProject(project.id))
    .then(() => closeModal())
    .then(() => history.push("/home"))
  }

  return (
    <>
      <h1>Delete the project?</h1>
      <ul> This will delete the project, along with any:
        <li>Tasks that are only in this project</li>
      </ul>
      <button onClick={() => closeModal()}>Cancel</button>
      <button onClick={() => handleDelete()}>Delete</button>
    </>
  );
}

export default DeleteProjectModal;
