
function TeamMemberProfile({user}) {

    const userInitials = `${user.first_name[0]}${user.last_name[0]}`
    return (
        <div className="user-profile-circle">
            {userInitials}
        </div>
    )
}

export default TeamMemberProfile
