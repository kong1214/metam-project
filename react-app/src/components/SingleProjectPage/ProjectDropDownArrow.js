import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditProjectFormModal from "../ProjectModals/EditProjectModal";
import DeleteProjectModal from "../ProjectModals/DeleteProjectModal";
import CreateTaskFormModal from "../TaskModals/CreateTaskModal";

function ProjectDropDownArrow({ project, sections }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
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

    // if not project owner
    const loggedInProjectOwner = sessionUser.id === project.owner_id
    const ulClassName = "project-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu} className="project-page-dropdown-button">
                <i className="fa-solid fa-caret-down" />
            </button>
            <div className={ulClassName} ref={ulRef}>
                <OpenModalButton
                    buttonText="Add a Task"
                    onButtonClick={closeMenu}
                    modalComponent={<CreateTaskFormModal projectId={project.id} sections={sections}/>}
                    className="modal-button"
                />
                {loggedInProjectOwner && (
                    <>
                        <OpenModalButton
                            buttonText="Edit Project"
                            onButtonClick={closeMenu}
                            modalComponent={<EditProjectFormModal project={project} />}
                            className="modal-button"
                        />

                        <OpenModalButton
                            buttonText="Delete Project"
                            onButtonClick={closeMenu}
                            modalComponent={<DeleteProjectModal project={project} />}
                            className="modal-button"
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default ProjectDropDownArrow;
