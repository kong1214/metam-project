from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Project, User, db
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
    sections = project.sections
    users = project.users
    parsed_project = project.to_dict()
    parsed_project["num_tasks"] = len(tasks)
    parsed_project["num_sections"] = len(sections)
    parsed_project["users"] = [user.to_dict() for user in users]
    return {"project": parsed_project}

@project_routes.route('', methods=["POST"])
@login_required
def create_project():
    """
    Add a project
    """
    user = db.session.query(User).get(current_user.id)
    form = CreateProjectForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_project = Project(
            owner_id=current_user.id,
            name=form.data["name"],
            icon=form.data["icon"],
            status=form.data["status"],
            due_date=form.data["due_date"],
            created_at=form.data["created_at"],
            updated_at=form.data["updated_at"],
        )

        new_project.users.append(user)


        db.session.add(new_project)
        db.session.commit()

        parsed_project = new_project.to_dict()
        users = new_project.users
        parsed_project["users"] = [user.to_dict() for user in users]

        return parsed_project
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@project_routes.route('/<int:project_id>', methods=["PUT"])
@login_required
def edit_project(project_id):
    """
    Edit a project
    """
    project = Project.query.get(project_id)

    form = CreateProjectForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        project.name=form.data["name"]
        project.icon=form.data["icon"]
        project.status=form.data["status"]
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
