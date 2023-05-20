from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, SubmitField, DecimalField
from wtforms.validators import DataRequired, NumberRange, Length


class CommentForm(FlaskForm):
    comment_body = StringField('Comment', validators=[DataRequired(), Length(max=500, message='Comment must be less than 500 characters')])
