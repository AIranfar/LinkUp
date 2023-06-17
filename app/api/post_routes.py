from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Post, User, db
from app.forms import PostForm
from datetime import date
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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
        post['owner_first_name'] = post_owner['first_name']
        post['owner_last_name'] = post_owner['last_name']
        post['owner_profile_picture'] = post_owner['profile_image']
    return response

# Create a new Post

@post_routes.route('/new', methods=['POST'])
@login_required
def create_new_post():
    form = PostForm()
    user_id = session.get('_user_id')
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {'error': upload['errors']}

        new_post = Post(
            user_id = user_id,
            post_body = form.data['post_body'],
            image = upload['url'],
            created_at = date.today(),
            updated_at = date.today()
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return form.errors

# Edit a Post

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    data = request.get_json()

    if post:
        if 'image' in data:
            if post.image:
                remove_file_from_s3(post.image)

            image = data['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return {'error': upload['errors']}

            post.image = upload['url']
            
        post.post_body = data['post_body']

        db.session.commit()
        return post.to_dict()

    return {'Message': 'Post was not successfully edited'}

# Delete Post

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if (not post):
        return ('No Post Found', 404)

    db.session.delete(post)
    db.session.commit()

    return {'Post Successfully Deleted': id}
