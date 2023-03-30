from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Section, db, Project, User
from app.forms import AddToTeamForm
from app.api.auth_routes import validation_errors_to_error_messages

team_routes = Blueprint('teams', __name__)

@team_routes.route('/project/<int:project_id>')
@login_required
def get_team(project_id):
    """
    Add a team member to a project
    """
    project = Project.query.get(project_id)
    users = project.users

    return {'team': [user.to_dict() for user in users]}

@team_routes.route('/project/<int:project_id>', methods=["POST"])
@login_required
def add_to_team(project_id):
    """
    Add a team member to a project
    """
    project = Project.query.get(project_id)
    users = project.users

    form = AddToTeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = db.session.execute(db.select(User).filter_by(email=form.data["email"])).scalar_one()
        project.users.append(user)
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@team_routes.route('/project/<int:project_id>/user/<int:user_id>', methods=["DELETE"])
@login_required
def delete_from_team(project_id, user_id):
    """
    Delete a user from the project
    """
    project = Project.query.get(project_id)
    user = User.query.get(user_id)

    project.users.remove(user)

    db.session.commit()

    return {'Response': "Successfully Deleted"}
