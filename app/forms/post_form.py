from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, SubmitField, DecimalField
from wtforms.validators import DataRequired, NumberRange, Length

class PostForm(FlaskForm):
    post_body = StringField('Post', validators=[DataRequired(), Length(min=5, max=500, message='Post must be between 5 and 500 characters')])
    image = StringField('Image')
    submit = SubmitField('Submit')
