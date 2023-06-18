from flask import Blueprint, request
from flask_login import login_required
from app.models import Like, Post, db
from datetime import date

like_routes = Blueprint('likes', __name__)

# get all likes from post by postId

@like_routes.route('<int:post_id>')
@login_required
def get_all_likes(post_id):
    post = Post.query.get(post_id)
    likes = [like.to_dict() for like in post.likes]

    return likes
