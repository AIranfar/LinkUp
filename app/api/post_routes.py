from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Post, User, db
from app.forms import PostForm
from datetime import date

post_routes = Blueprint('posts', __name__)

# get all posts

@post_routes.route('/')
# @login_required
def get_all_posts():
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

# Create a new Post

@post_routes.route('/new', methods=['POST'])
@login_required
def create_new_post():
    form = PostForm()
    user_id = session.get('_user_id')
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_post = Post(
            user_id = user_id,
            post_body = form.data['post_body'],
            image = form.data['image'],
            created_at = date.today(),
            updated_at = date.today()
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return form.errors

# Delete Post

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query(id)
    if (not post):
        return ('No Post Found', 404)

    db.session.delete(post)
    db.session.commit()

    return {'Post Successfully Deleted': id}
