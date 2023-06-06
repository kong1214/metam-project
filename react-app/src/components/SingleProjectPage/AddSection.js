import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSection } from "../../store/section";
import "./SingleProjectPage.css"


function AddSection({ projectId }) {
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState("");


    const handleCreateSection = async (e) => {
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


        const newSection = {
            name: sectionName,
            created_at: date,
            updated_at: date
        }

        return dispatch(createSection(projectId, newSection)).then(setSectionName(""))
    }

    return (
        <div className="add-section-name-container">
            <form className="add-section-form" onSubmit={handleCreateSection}>
                <div className="add-section-form-input-wrapper">
                    <input
                        id="add-section-input"
                        type="text"
                        value={sectionName}
                        placeholder="Add a section"
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                </div>
                <button className="single-project-button" id="add-section-submit-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}


export default AddSection
