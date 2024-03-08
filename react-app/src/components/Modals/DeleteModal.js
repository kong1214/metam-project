import React from "react";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../store/section"
import { deleteTask } from "../../store/task"
import { deleteProject } from "../../store/project"
import { useModal } from "../../context/Modal";
import './DeleteModal.css'

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

    let modalBullets = []
    if (type === 'project') {
        modalBullets = ['Sections that are in this project', 'Tasks that are in this project']
    } else if (type === 'section') {
        modalBullets = ['Tasks that are in this project']
    }
    return (
        <div className="delete-modal-container">
            <div className="delete-modal-header">Delete <strong>{item.name}</strong>?</div>
            {type !== 'task' && <div className="delete-section-content-container">
                <div id="delete-section-warning">This will delete the {type}, along with any:</div>
                {modalBullets.map((bullet, index) => (
                    <div key={index}>{bullet}</div>
                ))}
            </div>}
            <div className="delete-modal-buttons">
                <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
                <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteModal;
