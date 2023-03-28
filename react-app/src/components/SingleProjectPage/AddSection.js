import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getSingleProject } from "../../store/project";
import { getAllSections, createSection } from "../../store/section";
import task, { getAllTasks, moveTask, clearTasks } from "../../store/task";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import LeftNavBar from "../Navigation/LeftNavBar";
import ProjectHeader from "./ProjectHeader";
import Section from "./Section";
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
                    <label className="section-text-field">
                        <input
                            type="text"
                            value={sectionName}
                            placeholder="Add a section"
                            onChange={(e) => setSectionName(e.target.value)}
                        />
                    </label>
                </div>
                <button className="add-section-submit-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}


export default AddSection
