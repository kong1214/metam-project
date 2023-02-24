from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import CreateProjectForm
from app.api.auth_routes import validation_errors_to_error_messages

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

@project_routes.route('', methods=["POST"])
@login_required
def create_project():
    """
    Add a project
    """
    form = CreateProjectForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_project = Project(
            project_owner_id=current_user.id,
            project_name=form.data["project_name"],
            project_icon=form.data["project_icon"],
            project_status=form.data["project_status"],
            due_date=form.data["due_date"],
            created_at=form.data["created_at"],
            updated_at=form.data["updated_at"]
        )
        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@project_routes.route('/<int:project_id>', methods=["PUT"])
@login_required
def edit_project(project_id):
    """
    Edit a project
    """
    project = Project.query.get(project_id)

    form = CreateProjectForm()
    print(f"\n\n\n{dict(form.data)}\n\n\n")
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        project.project_name=form.data["project_name"]
        project.project_icon=form.data["project_icon"]
        project.project_status=form.data["project_status"]
        project.due_date=form.data["due_date"]
        project.updated_at=form.data["updated_at"]

        db.session.commit()

        return project.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@project_routes.route('/<int:project_id>', methods=["DELETE"])
@login_required
def delete_project(project_id):
    """
    Delete a project
    """
    project = Project.query.get(project_id)

    if project is None:
        return {"error": f"No project found with id {project_id}"}

    db.session.delete(project)
    db.session.commit()
    return {'success': "True", "status_code": 200}
