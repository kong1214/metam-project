from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Task, Project, db
from app.forms import CreateTaskForm
from app.api.auth_routes import validation_errors_to_error_messages

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/project/<int:project_id>')
@login_required
def get_all_tasks(project_id):
    """
    Query for all tasks of a project and returns them in a list of user dictionaries
    """
    project = Project.query.get(project_id)
    tasks = project.tasks
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/project/<int:project_id>', methods=["POST"])
@login_required
def create_task(project_id):
    """
    Add a Task to a Project
    """
    form = CreateTaskForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_task = Task(
            project_id=project_id,
            task_name=form.data["task_name"],
            due_date=form.data["due_date"],
            priority=form.data["priority"],
            task_status=form.data["task_status"],
            project_section=form.data["project_section"],
            description=form.data["description"],
            created_at=form.data["created_at"],
            updated_at=form.data["updated_at"]
        )
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
