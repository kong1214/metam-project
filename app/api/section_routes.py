from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Section, db, Project
from app.forms import CreateSectionForm
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

@section_routes.route('/<int:project_id>', methods=["POST"])
@login_required
def add_section(project_id):
    """
    Add a section to a project
    """

    project = Project.query.get(project_id)
    sections_length = len(project.sections)

    form = CreateSectionForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_section=Section(
            name=form.data["name"],
            project_id=project_id,
            order=sections_length+1,
            created_at=form.data["created_at"],
            updated_at=form.data["updated_at"]
        )
        db.session.add(new_section)
        db.session.commit()
        return new_section.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<int:section_id>', methods=["PUT"])
@login_required
def edit_section(section_id):
    """
    Edit a section's name to a project
    """

    section = Section.query.get(section_id)

    form = CreateSectionForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        section.name=form.data["name"]
        section.updated_at=form.data["updated_at"]

        db.session.commit()
        return section.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<int:section_id>', methods=["DELETE"])
@login_required
def delete_section(section_id):
    """
    Delete a section from a Project
    """
    section = Section.query.get(section_id)
    # Query for all sections in the section with an order after the section to delete and move their order down by 1
    sections = Section.query.filter_by(project_id=section.project_id).filter(Section.order > section.order).all()
    for s in sections:
        s.order -= 1
    if section is None:
        return {"error": f"No section found with id {section_id}"}

    db.session.delete(section)
    db.session.commit()
    return {'success': "True", "status_code": 200}
