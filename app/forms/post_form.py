from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import db, Post


def contentValidator(form, field):
    content = field.data
    if len(content) > 150:
        raise ValidationError('Content must be less than 150 characters long.')


class NewPost(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    content = StringField('Content', validators=[
                          DataRequired(), contentValidator])
    image_url = StringField('Image Url', validators=[DataRequired(), URL(
        require_tld=True, message="Please enter a valid url for the cover photo")])


class EditPost(FlaskForm):
    content = StringField('Content', validators=[
                          DataRequired(), contentValidator])
