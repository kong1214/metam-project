import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/task";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./DeleteTaskModal.css"

function DeleteTaskModal({ task }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = async () => {

    return dispatch(deleteTask(task.id))
      .then(() => closeModal())
  }

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-header">Delete Task: {task.task_name}?</div>
      <div className="delete-modal-buttons">
        <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
        <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
