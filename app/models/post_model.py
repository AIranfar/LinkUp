from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_body = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='post')
    comment = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    like = db.relationship('Like', back_populates='post', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'post_body': self.post_body,
            'user_id': self.user_id,
            'image': self.image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
