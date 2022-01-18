from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Like
from app.forms import NewLike

like_routes = Blueprint('likes', __name__)


@like_routes.route('/new', methods=['POST'])
@login_required
def newLike():
    form = NewLike()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        likeToCreate = Like(
            user_id=form.data['user_id'], post_id=form.data['post_id']
        )
        db.session.add(likeToCreate)
        db.session.commit()

        return Like.query.get(likeToCreate.id).to_dict()

    else:
        return 'Something went wrong while creating a like'


@like_routes.route('/<int:like_id>/delete', methods=['DELETE'])
@login_required
def deleteLike(like_id):
    like = Like.query.get(like_id)
    db.session.delete(like)
    db.session.commit()
    return {'post_id': like.post_id, 'id': like.id, 'user': like.user_id}
