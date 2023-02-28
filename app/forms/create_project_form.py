from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User



class CreateProjectForm(FlaskForm):
    project_name = StringField('Name', validators=[DataRequired(), Length(min=1, max=30, message= "The project name must be between 1 and 30 characters long.")])
    project_icon = StringField('Icon', validators=[DataRequired()])
    project_status = StringField('Status', validators=[DataRequired()])
    due_date = StringField('Due Date', validators=[DataRequired()])
    created_at = StringField("Created At")
    updated_at = StringField("Updated At")
