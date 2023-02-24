from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User



class CreateProjectForm(FlaskForm):
    project_name = StringField('Name', validators=[DataRequired()])
    project_icon = StringField('Icon', validators=[DataRequired()])
    project_status = StringField('Status', validators=[DataRequired()])
    due_date = StringField('Due Date', validators=[DataRequired()])
    created_at = StringField("Created At")
    updated_at = StringField("Updated At")
