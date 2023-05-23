from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=4, max=40, message='Username must be between 4 and 40 characters')])
    email = StringField(
        'email', validators=[DataRequired(), Email(message='Please provide a valid Email'), user_exists])
    first_name = StringField(
        'first_name', validators=[DataRequired(), Length(min=3, max=50, message='First name must be between 3 and 50 characters')])
    last_name = StringField(
        'last_name', validators=[DataRequired(), Length(min=3, max=50, message='Last name must be between 3 and 50 characters')])
    profile_image = StringField(
        'profile_image', validators=[DataRequired()])
    about_me = StringField('about_me')
    location = StringField('location')
    password = StringField(
        'password', validators=[DataRequired(), Length(min=6, message='Password must be at least 6 characters')])
