import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import TeamMemberProfile from "./TeamMemberProfile";
import "./Navigation.css"

function TeamList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const singleProject = useSelector(state => state.project.singleProject)

    let unparsedUsers = singleProject.users
    let users = []
    let isLoggedInProjectOwner = false
    let loggedInInitials
    let projectOwnerInitials

    console.log(singleProject)
    // Find the Index  of the Logged-in-User in Users
    const loggedInUserIndex = unparsedUsers.findIndex((user) => sessionUser.id === user.id)
    const projectOwnerUserIndex = unparsedUsers.findIndex((user) => user.id === singleProject.owner_id)
    // Remove the logged in user from the array and add them to the beginning
    users.push(unparsedUsers[loggedInUserIndex])
    if (loggedInUserIndex !== projectOwnerUserIndex) {
        users.push(unparsedUsers[projectOwnerUserIndex])
    }
    const remainingUsers = unparsedUsers.filter((user) => user.id !== unparsedUsers[loggedInUserIndex].id && user.id !== unparsedUsers[projectOwnerUserIndex].id)
    users.push(...remainingUsers)

    // if the user is the logged in project owner
    if (loggedInUserIndex === projectOwnerUserIndex) {
        isLoggedInProjectOwner = true;
        loggedInInitials = `${users[0].first_name[0]}${users[0].last_name[0]}`
    } else {
        loggedInInitials = `${users[0].first_name[0]}${users[0].last_name[0]}`
        projectOwnerInitials = `${users[1].first_name[0]}${users[1].last_name[0]}`
    }

    return (
        <div id="team-container">
            <div id="team-header">Team</div>
            <div id="team-members-container">
                {isLoggedInProjectOwner ? (
                    <div className="user-profile-circle logged-in-user project-owner">
                        {loggedInInitials}
                    </div>
                ) : (
                    <div>
                        <div className="user-profile-circle logged-in-user">
                            {loggedInInitials}
                        </div>
                        <div className="user-profile-circle project-owner">
                            {projectOwnerInitials}
                        </div>
                    </div>
                )}
                {remainingUsers.map((member) => (
                    <TeamMemberProfile key={member.id} user={member} />
                ))}
            </div>
        </div>
    )
}

export default TeamList
