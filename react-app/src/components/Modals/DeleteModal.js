import React from "react";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../store/section"
import { deleteTask } from "../../store/task"
import { deleteProject } from "../../store/project"
import { useModal } from "../../../context/Modal";

function DeleteModal({ type, item }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {

    switch (type) {
        case 'project':
            return dispatch(deleteProject(item.id))
            .then(() => closeModal())
            break;
        case 'section':
            return dispatch(deleteSection(item.id))
            .then(() => closeModal())
            break;
        case 'task':
            return dispatch(deleteTask(item.id))
            .then(() => closeModal())
            break;
        default:
            break;
    }
  }

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-header">Delete Section: {item.name}?</div>
      <div className="delete-section-content-container">
        <div id="delete-section-warning">This will delete the project, along with any:</div>
        <li className="each-deletion">Tasks that are in this section</li>
      </div>
      <div className="delete-modal-buttons">
        <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
        <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteModal;
