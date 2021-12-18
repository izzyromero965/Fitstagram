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

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'image_url': self.image_url,
            'comments': {comment.to_dict()['id']: comment.to_dict() for comment in self.comments}
        }
