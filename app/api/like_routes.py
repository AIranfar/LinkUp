from flask import Blueprint, request, session
from flask_login import login_required
from app.models import Like, Post, db
from datetime import date

like_routes = Blueprint('likes', __name__)

# get all likes

@like_routes.route('/')
@login_required
def get_all_likes():
    posts = Post.query.all()
    likes = []

    for post in posts:
        likes.extend([like.to_dict() for like in post.like])

    return likes

@like_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def create_new_like(post_id):
    post = Post.query.get(post_id)
    user_id = session.get('_user_id')

    if not post:
        return {'errors': ['Post not found']}, 404

    for like in post.likes:
        if like.user_id == user_id:
            return {'errors': ['Post already liked']}, 400

    like = Like (
        post = post,
        user_id = user_id
    )

    db.session.add(like)
    db.session.commit()

    return {'Message': 'Post liked successfully'}
