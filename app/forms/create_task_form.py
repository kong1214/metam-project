from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User



class CreateTaskForm(FlaskForm):
    task_name = StringField('Name', validators=[DataRequired()])
    due_date = StringField('Due Date', validators=[DataRequired()])
    priority = StringField('Icon', validators=[DataRequired()])
    task_status = StringField('Status', validators=[DataRequired()])
    project_section = StringField("Project Section", validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    created_at = StringField("Created At")
    updated_at = StringField("Updated At")
