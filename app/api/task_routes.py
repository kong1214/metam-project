from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Task, Project, db
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
