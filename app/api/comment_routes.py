from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Comment, User, db
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# get all comments

@comment_routes.route('/')
@login_required
def get_all_comments():
    post_comments = Comment.query.all()
    comments = [comment.to_dict() for comment in post_comments]

    for comment in comments:
        userId = comment['user_id']
        user = User.query.get(userId)
        comment_owner = user.to_dict()
        comment['User_info'] = comment_owner
        comment['comment_owner_first_name'] = comment_owner['first_name']
        comment['comment_owner_last_name'] = comment_owner['last_name']
        comment['comment_owner_profile_picture'] = comment_owner['profile_image']

    return comments

# create new comment

@comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def create_new_post(post_id):
    form = CommentForm()
    user_id = session.get('_user_id')
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = user_id,
            comment_body = form.data['comment_body'],
            post_id = post_id
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return form.errors
