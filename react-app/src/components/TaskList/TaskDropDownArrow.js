import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditTaskFormModal from "../EditTaskModal";
import DeleteProjectModal from "../DeleteProjectModal";

function TaskDropDownArrow({ task }) {
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


    const ulClassName = "task-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu}>
                <i className="fa-solid fa-caret-down"/>
            </button>
            <div className={ulClassName} ref={ulRef}>
                <div>
                </div>
                <OpenModalButton
                    buttonText="Edit Task"
                    onButtonClick={closeMenu}
                    modalComponent={<EditTaskFormModal task={task}/>}
                />

                <OpenModalButton
                    buttonText="Delete Task"
                    onButtonClick={closeMenu}
                    modalComponent={<DeleteProjectModal task={task}/>}
                />
            </div>
        </>
    );
}

export default TaskDropDownArrow;
