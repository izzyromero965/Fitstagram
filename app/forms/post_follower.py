from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class NewFollow(FlaskForm):
    follower_id = IntegerField('follower_id', validators=[DataRequired()])
    followed_id = IntegerField('followed_id', validators=[DataRequired()])
