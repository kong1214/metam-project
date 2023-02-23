const GET_ALL_PROJECTS = "projects/GET_ALL_PROJECTS";
const GET_SINGLE_PROJECT = "projects/GET_SINGLE_PROJECTS";

const getAll = (projects) => ({
    type: GET_ALL_PROJECTS,
    projects
});
const getSingle = (project) => ({
    type: GET_SINGLE_PROJECT,
    project
})


export const getAllProjects = () => async (dispatch) => {
    const response = await fetch("/api/projects");

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
export const getSingleProject = (project_id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${project_id}`);

    if (response.ok) {
        const project = await response.json();
        dispatch(getSingle(project));
        return project
    }
}

const initialState = { allProjects: {}, singleProject: {} };

const project = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PROJECTS:
            newState = { allProjects: {}, singleProject: {} }
            newState.allProjects = action.projects
            return newState
        case GET_SINGLE_PROJECT:
            newState = { allProjects: {...state.allProjects}, singleProject: {} }
            newState.singleProject = action.project
            return newState
        default:
            return state;
    }
}

export default project
