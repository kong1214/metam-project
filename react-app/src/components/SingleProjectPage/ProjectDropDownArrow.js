import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditProjectFormModal from "../EditProjectModal";
import DeleteProjectModal from "../DeleteProjectModal";
import CreateTaskFormModal from "../CreateTaskModal";

function ProjectDropDownArrow({ project }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "project-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu} className="project-page-dropdown-button">
                <i className="fa-solid fa-caret-down"/>
            </button>
            <div className={ulClassName} ref={ulRef}>
                <OpenModalButton
                    buttonText="Edit Project"
                    onButtonClick={closeMenu}
                    modalComponent={<EditProjectFormModal project={project}/>}
                    className="modal-button"
                />
                <OpenModalButton
                    buttonText="Delete Project"
                    onButtonClick={closeMenu}
                    modalComponent={<DeleteProjectModal project={project}/>}
                    className="modal-button"
                />
                <OpenModalButton
                    buttonText="Add a Task"
                    onButtonClick={closeMenu}
                    modalComponent={<CreateTaskFormModal projectId={project.id}/>}
                    className="modal-button"
                />
            </div>
        </>
    );
}

export default ProjectDropDownArrow;
