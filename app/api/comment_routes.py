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
def create_new_comment(post_id):
    user_id = session.get('_user_id')
    data = request.get_json()
    print('DATAAAAAAAAAA----->', data)
    new_comment = Comment(
        comment_body=data['comment_body'],
        user_id=user_id,
        post_id=post_id
    )
    db.session.add(new_comment)
    db.session.commit()

    return {'comment': new_comment.to_dict()}


# edit comment

@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    data = request.get_json()
    print("DATA", data)

    if comment:
        comment.comment_body = data['comment_body']

        db.session.commit()
        return comment.to_dict()
    return {'Message': 'Comment was not successfully edited'}

# delete comment

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if (not comment):
        return ('No comment found'), 404

    db.session.delete(comment)
    db.session.commit()

    return {'Comment Successfully Deleted': comment_id}
