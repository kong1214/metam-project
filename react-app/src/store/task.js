const GET_ALL_TASKS = "TASK/GET_ALL_TASKS";
const GET_SINGLE_TASK = "TASKS/GET_SINGLE_TASKS";
const CREATE_A_TASK = "TASKS/CREATE_A_TASK"
const EDIT_A_TASK = "TASKS/EDIT_A_TASK"
const DELETE_A_TASK = "TASKS/DELETE_A_TASK"

const getAll = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
});
const getSingle = (task) => ({
    type: GET_SINGLE_TASK,
    task
})
const add = (task, projectId) => ({
    type: CREATE_A_TASK,
    task
})
const edit = (task) => ({
    type: EDIT_A_TASK,
    task
})
const remove = (taskId) => ({
    type: DELETE_A_TASK,
    taskId
})


export const getAllTasks = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/project/${projectId}`);

    if (response.ok) {
        const data = await response.json();
        let normalizedData = {}
        data.tasks.forEach(task => {
            normalizedData[task.id] = task
        })
        dispatch(getAll(normalizedData));
        return normalizedData
    }
};

export const createTask = (task, projectId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/project/${projectId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    })
    if(response.ok) {
        const task = await response.json()
        dispatch(add(task))
        return task
    }
}
export const editTask = (task, taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    })
    if(response.ok) {
        const task = await response.json()
        dispatch(edit(task))
        return task
    }
}
export const deleteTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        dispatch(remove(taskId))
    }
}


const initialState = { allTasks: {}, singleTask: {} };


const task = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_TASKS:
            newState = { allTasks: {}, singleTask: {} }
            newState.allTasks = action.tasks
            return newState
        case CREATE_A_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}}
            newState.allTasks[action.task.id] = action.task
            return newState
        case EDIT_A_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}}
            newState.allTasks[action.task.id] = action.task
            return newState
        case DELETE_A_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}}
            delete newState.allTasks[action.taskId]
            return newState
        default:
            return state;
    }
}

export default task
