import "./HomePage.css"

function TaskPill({ task }) {


    return (
        <div className="task-pill-container">
            <div className={`task-pill-task-priority-${task.priority} task-pill-info`}>
                {task.priority}
            </div>
            priority task,
            <div className="task-pill-task-name task-pill-info task-pill-name">
                {task.task_name}
            </div>
            for
            <div className="task-pill-project-name task-pill-info task-pill-name">
                {task.project.project_name},
            </div>
            is
            <div className={`task-pill-task-status-${task.task_status} task-pill-info`}>
                {task.task_status}
            </div>
        </div>
    )
}

export default TaskPill
