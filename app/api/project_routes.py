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
    # print(f"\n\n\n{projects}\n\n\n")
    # for project in projects:
    #     print(project.to_dict())
    return {'projects': [project.to_dict() for project in projects]}


@project_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
