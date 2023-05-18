from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Post, User, db
from app.forms import PostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)

##get all posts

@post_routes.route('/')
# @login_required
def get_all_posts():
    """"
    Query for all products route that returns all of the products from the db.
    """
    all_posts = Post.query.all()
    response = [one_post.to_dict() for one_post in all_posts]
    print('All Posts', all_posts)

    # Adds owner username to product
    for post in response:
        user_id = post['user_id']
        user = User.query.get(user_id)
        post_owner = user.to_dict()
        post['owner_info'] = post_owner['username']
    return response
