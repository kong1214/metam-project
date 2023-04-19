const GET_ALL_TASKS = "TASK/GET_ALL_TASKS";
const GET_ALL_TASKS_BY_DATE = "TASK/GET_ALL_TASKS_BY_DATE"
const GET_SINGLE_TASK = "TASKS/GET_SINGLE_TASKS";
const CREATE_A_TASK = "TASKS/CREATE_A_TASK"
const EDIT_A_TASK = "TASKS/EDIT_A_TASK"
const EDIT_TASK_ORDER = "TASKS/EDIT_TASK_ORDER"
const ASSIGN_TASK = "TASKS/ASSIGN_TASK"
const DELETE_A_TASK = "TASKS/DELETE_A_TASK"

const getAll = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
});
const getAllByDate = (tasks) => ({
    type: GET_ALL_TASKS_BY_DATE,
    tasks
})
const getSingle = (task) => ({
    type: GET_SINGLE_TASK,
    task
})
const add = (task) => ({
    type: CREATE_A_TASK,
    task
})
const edit = (task) => ({
    type: EDIT_A_TASK,
    task
})
const move = (task) => ({
    type: EDIT_TASK_ORDER,
    task
})
const assign = (task) => ({
    type: ASSIGN_TASK,
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

export const getAllTasksByDate = (userId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/user/${userId}`)

    if (response.ok) {
        const data = await response.json();
        let normalizedData = {}
        data.tasks.forEach(task => {
            normalizedData[task.id] = task
        })
        dispatch(getAllByDate(normalizedData));
        return normalizedData
    }
}


export const createTask = (task, projectId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/project/${projectId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    })
    if(response.ok) {
        const task = await response.json()
        dispatch(add(task))
        // console.log(task)
        return task
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return {errors: data.errors}
		}
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
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return {errors: data.errors}
		}
    }
}
export const moveTask = (taskId, newOrder, newSectionId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/drag/${taskId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({newOrder, newSectionId})
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(move(task))
        return task
    }
}
export const editAssignee = (taskId, newAssigneeId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/assignee/${taskId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({newAssigneeId})
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(assign(task))
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

const initialState = { allTasks: {}, singleTask: {}, dueToday: {} };


const task = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_TASKS:
            newState = { allTasks: {}, singleTask: {}, dueToday: {} }
            newState.allTasks = action.tasks
            return newState
        case GET_ALL_TASKS_BY_DATE:
            newState = {allTasks: {}, singleTask: {}, dueToday: {}}
            newState.dueToday = action.tasks
            return newState
        case CREATE_A_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}, dueToday: {}}
            newState.allTasks[action.task.id] = action.task
            return newState
        case EDIT_A_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}, dueToday: {}}
            newState.allTasks[action.task.id] = action.task
            return newState
        case EDIT_TASK_ORDER:
            newState = {allTasks: {...state.allTasks}, singleTask: {}, dueToday: {}}
            newState.allTasks[action.task.id] = action.task
            return newState
        case ASSIGN_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}, dueToday: {}}
            newState.allTasks[action.task.id] = action.task
            return newState
        case DELETE_A_TASK:
            newState = {allTasks: {...state.allTasks}, singleTask: {}, dueToday: {...state.dueToday}}
            delete newState.allTasks[action.taskId]
            delete newState.dueToday[action.taskId]
            return newState
        default:
            return state;
    }
}

export default task
