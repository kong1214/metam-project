import { useSelector } from "react-redux";
import TeamMemberDropDown from "./TeamMemberDropDown";
import AddTeamMemberModal from "../TeamModals/AddTeamMemberModal.js";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css"

function TeamList() {

    const sessionUser = useSelector(state => state.session.user);
    const singleProject = useSelector(state => state.project.singleProject)
    const team = useSelector(state => state.team)

    let unparsedUsers = Object.values(team)
    let users = []
    let isLoggedInProjectOwner = false
    let loggedInInitials
    let projectOwnerInitials

    // Find the Index  of the Logged-in-User in Users
    const loggedInUserIndex = unparsedUsers.findIndex((user) => {
        console.log('sessionUser', sessionUser)
        console.log('user', user)
        return sessionUser.id === user.id
    })

    const projectOwnerUserIndex = unparsedUsers.findIndex((user) => user.id === singleProject.owner_id)

    // If No Project Owner or Logged In User found, return null
    if (projectOwnerUserIndex === -1) return null;
    if (loggedInUserIndex === -1) return null;

    // Remove the logged in user from the array and add them to the beginning
    users.push(unparsedUsers[loggedInUserIndex])

    // If the logged in user and the project owner are different, push the project owner to the users array
    if (loggedInUserIndex !== projectOwnerUserIndex) {
        users.push(unparsedUsers[projectOwnerUserIndex])
    }

    // Filter the users by those who are not the logged in user nor the project owner and spread that into the users array
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

    console.log(loggedInUserIndex)
    console.log(unparsedUsers)
    return (
        <div id="team-container">
            <div id="team-header">Team
            {loggedInUserIndex === projectOwnerUserIndex &&
                <OpenModalButton
                    buttonText=""
                    modalComponent={<AddTeamMemberModal projectId={singleProject.id} />}
                    className="fa-solid fa-plus add-to-team-button"
                />}
                </div>
            <div id="team-members-container">
                {isLoggedInProjectOwner ? (
                    <TeamMemberDropDown user={unparsedUsers[loggedInUserIndex]} className="user-profile-circle logged-in-user project-owner" initials={loggedInInitials} isSessionUser={true}/>
                ) : (
                    <div style={{ display: "flex" }}>
                        <TeamMemberDropDown user={unparsedUsers[loggedInUserIndex]} className="user-profile-circle logged-in-user" initials={loggedInInitials} isSessionUser={true}/>
                        <TeamMemberDropDown user={unparsedUsers[projectOwnerUserIndex]} className="user-profile-circle project-owner" initials={projectOwnerInitials} />
                    </div>
                )}
                {remainingUsers.map((member) => (
                    <TeamMemberDropDown key={member.id} user={member} className="user-profile-circle" initials={`${member.first_name[0]}${member.last_name[0]}`} />
                ))}
            </div>
        </div>
    )
}

export default TeamList
