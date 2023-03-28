import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { editSection } from "../../../store/section";
import { useModal } from "../../../context/Modal";
import "./EditSectionModal.css"

function EditSectionModal({ section }) {
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState(section.name);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!sectionName.length || sectionName.length > 30) {
            window.alert(
                "Please enter a valid section that is less than 30 characters."
            );
            return
        }

        const today = new Date()
        const year = today.getFullYear()
        let month = today.getMonth() + 1
        if (month < 10) {
            month = `0${month}`
        }
        const day = today.getDate()
        const date = `${month}/${day}/${year}`;

        const updatedSection = {
            id: section.id,
            name: sectionName,
            updated_at: date,
        };

        return dispatch(editSection(updatedSection))
            .then(() => closeModal())
    }
    return (
        <div className="edit-section-form-container">
            <div className="edit-section-header">Edit Section Name</div>
            <form onSubmit={handleSubmit}>
                <div className="edit-section-label-input">
                    <input
                        className="edit-section-input"
                        type="text"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                </div>
                <div id="edit-section-button-container">
                    <button className="edit-section-button" type="submit">
                        Edit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditSectionModal
