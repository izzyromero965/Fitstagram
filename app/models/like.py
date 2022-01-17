from .db import db
import datetime


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    likeOwner = db.relationship('User', back_populates="likes")
    posts = db.relationship('Post', back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.likeOwner.id,
            'post_id': self.post_id
        }
