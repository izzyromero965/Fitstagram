from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextField
from wtforms.fields.simple import FileField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import db, Post


def contentValidator(form, field):
    content = field.data
    if len(content) > 150:
        raise ValidationError('Content must be less than 150 characters long.')


class NewPost(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    content = TextField('Content', validators=[
        DataRequired(), contentValidator])
    image_url = FileField('Image Url', validators=[DataRequired()])


class EditPost(FlaskForm):
    content = TextField('Content', validators=[
        DataRequired(), contentValidator])
