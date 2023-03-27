const GET_ALL_SECTIONS = "sections/GET_ALL_SECTIONS";
const CREATE_SECTION = "sections/CREATE_SECTION"


const getAll = (sections) => ({
    type: GET_ALL_SECTIONS,
    sections
})
const create = (section) => ({
    type: CREATE_SECTION,
    section
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

export const createSection = (projectId, section) => async (dispatch) => {
    const response = await fetch(`/api/sections/${projectId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(section)
    })
    if(response.ok) {
        const sectionId = await response.json()
        dispatch(create(sectionId))
        return sectionId
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return {errors: data.errors}
		}
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
        case CREATE_SECTION:
            newState = {...state}
            newState[action.section.id] = action.section
            return newState
        default:
            return state;
    }
}

export default section
