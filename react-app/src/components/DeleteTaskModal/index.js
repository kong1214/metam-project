import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/task";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

function DeleteTaskModal({taskId}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = async () => {

    return dispatch(deleteTask(taskId))
    .then(() => closeModal())
  }

  return (
    <>
      <h1>Delete the task?</h1>
      <button onClick={() => closeModal()}>Cancel</button>
      <button onClick={() => handleDelete()}>Delete</button>
    </>
  );
}

export default DeleteTaskModal;
