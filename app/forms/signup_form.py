from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def is_email(form, field):
    email = field.data
    if email.find('@') == -1 or email.find(".") == -1:
        raise ValidationError('Please input a valid email address')

def email_length(form, field):
    email = field.data
    if len(email) < 3 or len(email) > 29:
        raise ValidationError('Email must be between 2 and 29 letters')

def name_length(form, field):
    name = field.data
    if len(name) < 2 or len(name) > 29:
        raise ValidationError('Name must be between 2 and 29 letters')

def name_is_letters(form, field):
    name = field.data
    if not name.isalpha():
        raise ValidationError('Name must be only letters')

def password_length(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be six or more characters')

class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), name_length, name_is_letters])
    last_name = StringField('last_name', validators=[DataRequired(), name_length, name_is_letters])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email, email_length])
    password = StringField('password', validators=[DataRequired(), password_length])
