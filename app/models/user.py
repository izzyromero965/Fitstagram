from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer,
              db.ForeignKey("users.id"), nullable=False),
    db.Column("followed_id", db.Integer,
              db.ForeignKey("users.id"), nullable=False)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    nick_name = db.Column(db.String(50), nullable=False)
    profile_image_url = db.Column(db.String)
    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    posts = db.relationship(
        'Post', back_populates="postOwner", cascade="all, delete-orphan")

    comments = db.relationship(
        'Comment', back_populates="commentOwner")

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def followUser(self, user):
        if user not in self.following:
            self.following.append(user)
            return self.to_dict

    def unfollowUser(self, user):
        if user in self.following:
            self.following.remove(user)
            return self.to_dict()

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username.lower(),
            'email': self.email,
            'nick_name': self.nick_name,
            'profile_image_url': self.profile_image_url,
            'posts': {post.id: post.to_dict() for post in self.posts},
            'follows': {user.id: user.to_dict_follows() for user in self.followers},
            'followers': {user.id: user.username for user in self.following}
        }

    def to_dict_follows(self):
        return {
            'id': self.id,
            'username': self.username.lower(),
            'email': self.email,
            'nick_name': self.nick_name,
            'profile_image_url': self.profile_image_url,
            'posts': {post.id: post.to_dict() for post in self.posts},
            'followers': {user.id: user.username for user in self.following}
        }

    def to_dict_comments(self):
        return {
            'id': self.id,
            'username': self.username.lower(),
            'profile_image_url': self.profile_image_url
        }
