import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditTaskFormModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";

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
                <OpenModalButton
                    buttonText="Edit Task"
                    onButtonClick={closeMenu}
                    modalComponent={<EditTaskFormModal task={task}/>}
                    className="modal-button"
                />

                <OpenModalButton
                    buttonText="Delete Task"
                    onButtonClick={closeMenu}
                    modalComponent={<DeleteTaskModal task={task}/>}
                    className="modal-button"
                />
            </div>
        </>
    );
}

export default TaskDropDownArrow;
