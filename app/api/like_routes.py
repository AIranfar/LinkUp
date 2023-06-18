from flask import Blueprint, request
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

