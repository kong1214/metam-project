const GET_TEAM_MEMBERS = "teams/GET_TEAM_MEMBERS"
const ADD_TO_TEAM = "teans/ADD_TO_TEAM";
const REMOVE_FROM_TEAM = "teams/REMOVE_FROM_TEAM"

const getAll = (members) => ({
    type: GET_TEAM_MEMBERS,
    members
})

const add = (member) => ({
    type: ADD_TO_TEAM,
    member
})

const remove = (memberId) => ({
    type: REMOVE_FROM_TEAM,
    memberId
})

export const loadTeam = (projectId) => async dispatch => {
    const response = await fetch(`/api/teams/project/${projectId}`)
    if (response.ok) {
        const data = await response.json()
        let normalizedData = {}
        data.team.forEach(member => {
            normalizedData[member.id] = member
        })
        dispatch(getAll(normalizedData))
        return normalizedData
    }
}

export const addToTeam = (projectId, email) => async (dispatch) => {
    const response = await fetch(`/api/teams/project/${projectId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email})
    })
    if(response.ok) {
        const newMember = await response.json()
        dispatch(add(newMember))
        return newMember
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return {errors: data.errors}
		}
    }
}

export const removeUser = (projectId, memberId) => async (dispatch) => {
    const response = await fetch(`/api/teams/project/${projectId}/user/${memberId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        dispatch(remove(memberId))
    }
}

const initialState = {};

const team = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_TEAM_MEMBERS:
            newState = {}
            newState = action.members
            return newState
        case ADD_TO_TEAM:
            newState = {...state}
            newState[action.member.id] = action.member
            return newState
        case REMOVE_FROM_TEAM:
            newState = {...state}
            delete newState[action.memberId]
            return newState
        default:
            return state;
    }
}

export default team
