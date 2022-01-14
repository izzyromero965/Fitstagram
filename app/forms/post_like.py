from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, Like


class NewLike(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    post_id = IntegerField('Post Id', validators=[DataRequired()])
