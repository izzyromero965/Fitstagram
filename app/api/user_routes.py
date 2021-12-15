from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Post
from app.forms import NewPost, EditPost
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/posts')
def get_posts(id):
    posts = Post.query.filter(Post.user_id == id)
    return {'posts': [post.to_dict() for post in posts]}


@user_routes.route('/<int:id>/posts', methods=['POST'])
def create_post(id):
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPost = Post(user_id=form['user_id'].data,
                       content=form['content'].data, image_url=form['image_url'].data)

        db.session.add(newPost)
        db.session.commit()
        return newPost.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
