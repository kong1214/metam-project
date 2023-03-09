from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Section, db, Project
from app.forms import CreateProjectForm
from app.api.auth_routes import validation_errors_to_error_messages

section_routes = Blueprint('sections', __name__)


@section_routes.route('/<int:project_id>')
@login_required
def get_all_sections(project_id):
    """
    Query for all sections of a user's project and returns them in a list of user dictionaries
    """

    project = Project.query.get(project_id)
    sections = project.sections
    return {'sections': [section.to_dict() for section in sections]}
