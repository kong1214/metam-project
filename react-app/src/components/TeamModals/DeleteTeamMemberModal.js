import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../store/project";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeUser } from "../../store/team";

function DeleteTeamMemberModal({ user, project, isCurrentUserAndNotOwner }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDelete = async () => {
        return dispatch(removeUser(project.id, user.id))
            .then(() => {
                closeModal()
                if (isCurrentUserAndNotOwner) {
                    history.push("/home")
                }
            })
    }

    return (
        <div id="delete-modal-container">
            {isCurrentUserAndNotOwner ? (
                <div className="delete-modal-header">
                    Leave
                    <div className="delete-modal-deletion-important">
                        <strong>{project.name}</strong>?
                    </div>
                </div>
            ) : (
                <div className="delete-modal-header">
                    Remove <strong>{user.first_name} {user.last_name}</strong> from:
                    <div className="delete-modal-deletion-important">
                        <strong>{project.name}</strong>?
                    </div>
                </div>
            )}
            <div className="delete-modal-buttons">
                <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
                <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteTeamMemberModal;