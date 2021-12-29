from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import NewComment, EditComment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/new', methods=['POST'])
@login_required
def newComment():
    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        commentToCreate = Comment(
            user_id=form.data['user_id'], post_id=form.data['post_id'], content=form.data['content'])
        db.session.add(commentToCreate)
        db.session.commit()

        return Comment.query.get(commentToCreate.id).to_dict()

    else:
        return 'Something went wrong while creating a comment'


@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
def editComment(comment_id):
    form = EditComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        commentToEdit = Comment.query.get(comment_id)
        commentToEdit.content = form.data['content']
        db.session.commit()
        return commentToEdit.to_dict()
    else:
        return 'Something went wrong while editing a comment'


@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def deleteComment(comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {'post_id': comment.post_id, 'id': comment.id}
