from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Project, db

project_routes = Blueprint('projects', __name__)


@project_routes.route('')
@login_required
def get_all_projects():
    """
    Query for all projects of a user and returns them in a list of user dictionaries
    """

    projects = current_user.projects
    return {'projects': [project.to_dict() for project in projects]}

@project_routes.route('/<int:project_id>')
@login_required
def single_project(project_id):
    """
    Get a single project's detals
    """
    project = Project.query.get(project_id)
    tasks = project.tasks
    user = project.user
    parsed_project = project.to_dict()
    parsed_project["num_tasks"] = len(tasks)
    parsed_project["owner"] = user.to_dict()
    return {"project": parsed_project}
