const GET_ALL_SECTIONS = "projects/GET_ALL_SECTIONS";




const getAll = (sections) => ({
    type: GET_ALL_SECTIONS,
    sections
})



export const getAllSections = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/sections/${projectId}`)

    if (response.ok) {
        const data = await response.json();
        let normalizedData = {}
        data.sections.forEach(section => {
            normalizedData[section.id] = section
        })
        dispatch(getAll(normalizedData));
        return normalizedData
    }
}

const initialState = {};

const section = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_SECTIONS:
            newState = {}
            newState = action.sections
            return newState
        default:
            return state;
    }
}

export default section
