import React from "react";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../../store/section";
import { useModal } from "../../../context/Modal";

function DeleteSectionModal({ section }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {

    return dispatch(deleteSection(section.id))
      .then(() => closeModal())
  }

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-header">Delete Section: {section.name}?</div>
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

export default DeleteSectionModal;
