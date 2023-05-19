from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Comment, User, db
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# get all comments by post id

@comment_routes.route('/<int:post_id>')
@login_required
def get_all_post_comments(post_id):
    post_comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at.desc()).all()
    comments = [comment.to_dict() for comment in post_comments]

    for comment in comments:
        userId = comment['user_id']
        user = User.query.get(userId)
        review_user = user.to_dict()
        comment['User_info'] = review_user

    return comments
