from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User



class EditTaskForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=1, max=30, message= "The task name must be between 1 and 30 characters long.")])
    due_date = StringField('Due Date', validators=[DataRequired()])
    priority = StringField('Icon', validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), Length(min=1, max=300, message= "The description name must be between 1 and 300 characters long.")])
    created_at = StringField("Created At")
    updated_at = StringField("Updated At")
