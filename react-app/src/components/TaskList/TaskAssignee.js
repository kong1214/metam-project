import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import TeamMemberProfile from "../Navigation/TeamMemberProfile.js";
import "./TaskList.css"

function TaskAssignee({ assignee, users }) {
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

    const usersWithoutAssignee = users.filter(user => user.id !== assignee.id)

    let assigneeOutput
    typeof assignee === "string" ? assigneeOutput = assignee : assigneeOutput = `${assignee.first_name} ${assignee.last_name}`
    const ulClassName = "task-assignee-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);
    return (
        <div className="assignee-item" onClick={openMenu} >
            <button className={assignee === "No Assignee!" ? "task-assignee none" : "task-assignee"}>{assigneeOutput}</button>
            <div className={ulClassName} ref={ulRef}>
                {usersWithoutAssignee.map((user) => (
                    <button key={user.id} className="assignee-user-map">
                        <TeamMemberProfile user={user}/>
                        {user.first_name} {user.last_name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TaskAssignee
