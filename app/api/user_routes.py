from flask import Blueprint, request
from flask_login import login_required
from app.forms.post_follower import NewFollow
from sqlalchemy import or_
from app.models import db, User, Post
from app.forms import NewPost, EditPost
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('<term>')
@login_required
def searchUsers(search):
    users = User.query.filter(
        or_(
            User.nick_name.ilike(f"%{search}%"),
            User.username.ilike(f"%{search}%")
        )
    ).all()

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


@user_routes.route('/<int:id>/posts/<int:post_id>', methods=["PUT"])
def edit_post(id):
    form = EditPost()
    postToEdit = Post.query.get(int(id))
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        postToEdit.content = form.data['content']
        db.session.commit()
        return postToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@user_routes.route('/<int:id>/posts/<int:post_id>', methods=['DELETE'])
def delete_post(id):
    postToDelete = Post.query.get(int(id))
    db.session.delete(postToDelete)
    db.session.commit()
    return {'message': f"Deleted post {id}"}


@user_routes.route('<int:id>/follows')
@login_required
def myFollowers(id):
    user = User.query.get(id)
    return user.to_dict()['follows']


@user_routes.route('/follows/new', methods=['POST'])
@login_required
def createFollow():
    form = NewFollow()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        follower_id = form.data['follower_id']
        followed_id = form.data['followed_id']
        user = User.query.get(follower_id)
        follow = User.query.get(followed_id)
        follow.followUser(user)
        db.session.commit()
        return user.to_dict()['follows']


@user_routes.route('/<int:follower_id>/follows/<int:followed_id>/delete', methods=['DELETE'])
@login_required
def deleteFollow(follower_id, followed_id):
    user = User.query.get(follower_id)
    unfollowed = User.query.get(followed_id)
    unfollowed.unfollowUser(user)
    db.session.commit()
    return {
        'user': follower_id,
        'unfollowed': followed_id
    }
