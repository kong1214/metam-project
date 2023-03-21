const GET_ALL_PROJECTS = "projects/GET_ALL_PROJECTS";
const GET_SINGLE_PROJECT = "projects/GET_SINGLE_PROJECTS";
const CREATE_A_PROJECT = "projects/CREATE_A_PROJECT"
const EDIT_A_PROJECT = "projects/EDIT_A_PROJECT"
const DELETE_A_PROJECT = "projects/DELETE_A_PROJECT"
const CLEAR_SINGLE_PROJECT = "projects/CLEAR_SINGLE_PROJECT"

const getAll = (projects) => ({
    type: GET_ALL_PROJECTS,
    projects
});
const getSingle = (project) => ({
    type: GET_SINGLE_PROJECT,
    project
})
const add = (project) => ({
    type: CREATE_A_PROJECT,
    project
})
const edit = (project) => ({
    type: EDIT_A_PROJECT,
    project
})
const remove = (projectId) => ({
    type: DELETE_A_PROJECT,
    projectId
})

export const clearProject = () => ({
    type: CLEAR_SINGLE_PROJECT
})

export const getAllProjects = () => async (dispatch) => {
    const response = await fetch("/api/projects");
    console.log("response", response)
    if (response.ok) {
        const data = await response.json();
        let normalizedData = {}
        data.projects.forEach(project => {
            normalizedData[project.id] = project
        })
        dispatch(getAll(normalizedData));
        return normalizedData
    }
};

export const getSingleProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`);

    if (response.ok) {
        const project = await response.json();
        dispatch(getSingle(project.project));
        return project
    }
}

export const createProject = (project) => async (dispatch) => {
    const response = await fetch(`/api/projects`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    })
    if(response.ok) {
        const project = await response.json()
        dispatch(add(project))
        return project
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return {errors: data.errors}
		}
    }
}

export const editProject = (project, projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    })
    if (response.ok) {
        const updatedProject = await response.json()
        dispatch(edit(updatedProject))
        return updatedProject
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return {errors: data.errors}
		}
    }
}
export const deleteProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        dispatch(remove(projectId))
    }
}


const initialState = { allProjects: {}, singleProject: {} };

const project = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case GET_ALL_PROJECTS:
            newState = { allProjects: {}, singleProject: {...state.singleProject} }
            newState.allProjects = action.projects
            return newState
        case GET_SINGLE_PROJECT:
            newState = { allProjects: {...state.allProjects}, singleProject: {} }
            newState.singleProject = action.project
            return newState
        case CREATE_A_PROJECT:
            newState = {allProjects: {...state.allProjects}, singleProject: action.project}
            newState.allProjects[action.project.id] = action.project
            return newState
        case EDIT_A_PROJECT:
            newState = {allProjects: {...state.allProjects}, singleProject: action.project}
            newState.allProjects[action.project.id] = action.project
            return newState
        case DELETE_A_PROJECT:
            newState = {allProjects: {...state.allProjects}, singleProject: {}}
            delete newState.allProjects[action.projectId]
            return newState
        case CLEAR_SINGLE_PROJECT:
            newState = {...state}
            newState = {allProjects: {...state.allProjects}, singleProject: {}}
            return newState
        default:
            return state;
    }
}

export default project
