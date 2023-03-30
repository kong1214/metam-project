import "./HomePage.css"

function TaskPill({ task }) {


    return (
        <div className="task-pill-container">
            <div className={`task-pill-task-priority-${task.priority} task-pill-info`}>
                {task.priority}
            </div>
            priority task,
            <div className="task-pill-task-name task-pill-info task-pill-name">
                {task.name}
            </div>
            for
            <div className="task-pill-project-name task-pill-info task-pill-name">
                {task.project.name},
            </div>
            is
            <div className={`task-pill-task-status-${task.status} task-pill-info`}>
                {task.status}
            </div>
        </div>
    )
}

export default TaskPill
