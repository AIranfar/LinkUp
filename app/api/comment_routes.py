from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Comment, User, db
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# get all comments

@comment_routes.route('/')
@login_required
def get_all_post_comments(post_id):
    post_comments = Comment.query.all()
    comments = [comment.to_dict() for comment in post_comments]

    for comment in comments:
        userId = comment['user_id']
        user = User.query.get(userId)
        review_user = user.to_dict()
        comment['User_info'] = review_user

    return comments
