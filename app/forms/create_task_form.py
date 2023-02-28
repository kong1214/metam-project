from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User



class CreateTaskForm(FlaskForm):
    task_name = StringField('Name', validators=[DataRequired(), Length(min=1, max=80, message= "The task name must be between 1 and 80 characters long.")])
    due_date = StringField('Due Date', validators=[DataRequired()])
    priority = StringField('Icon', validators=[DataRequired()])
    task_status = StringField('Status', validators=[DataRequired()])
    project_section = StringField("Project Section", validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), Length(min=1, max=300, message= "The description name must be between 1 and 300 characters long.")])
    created_at = StringField("Created At")
    updated_at = StringField("Updated At")
