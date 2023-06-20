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

    # print('likes', likes)
    return likes

@like_routes.route('/<int:post_id>/new', methods=['POST'])
@login_required
def create_new_like(post_id):
    post = Post.query.get(post_id)
    user_id = session.get('_user_id')

    if not post:
        return {'errors': ['Post not found']}, 404

    for like in post.like:
        if like.user_id == user_id:
            return {'errors': ['Post already liked']}, 400

    like = Like (
        post = post,
        user_id = user_id
    )

    db.session.add(like)
    db.session.commit()

    return like.to_dict()

@like_routes.route('/<int:post_id>/remove', methods=['DELETE'])
@login_required
def remove_like(post_id):
    post = Post.query.get(post_id)
    user_id = session.get('_user_id')

    if not post:
        return {'errors': ['Post not found']}, 404

    like = Like.query.filter_by(post_id=post_id, user_id=user_id).first()

    if not like:
        return {'errors': ['Like not found']}, 404

    db.session.delete(like)
    db.session.commit()

    return like.to_dict()
