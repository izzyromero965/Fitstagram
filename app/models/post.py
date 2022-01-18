from .db import db
import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text)
    image_url = db.Column(db.String)
    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    postOwner = db.relationship('User', back_populates="posts")
    comments = db.relationship(
        'Comment', back_populates='posts', cascade="all,delete-orphan")
    likes = db.relationship(
        'Like', back_populates="posts", cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'user': self.postOwner.to_dict_comments(),
            'image_url': self.image_url,
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            'likes': {like.user_id: like.to_dict() for like in self.likes}
        }
