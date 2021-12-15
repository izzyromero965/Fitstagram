from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, Comment


def contentValidator(form, field):
    content = field.data
    if len(content) > 250:
        raise ValidationError('Content must be less than 250 characters long.')


class NewComment(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    post_id = IntegerField("Post Id", validators=[DataRequired()])
    content = StringField("Content", validators=[
                          DataRequired(), contentValidator])


class EditComment(FlaskForm):
    content = StringField("content", validators=[
                          DataRequired(), contentValidator])
