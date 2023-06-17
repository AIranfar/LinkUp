from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# edit user profile info

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    user = User.query.get(id)
    data = request.get_json()

    if user:
        if 'profile_image' in data:
            if user.profile_image:
                remove_file_from_s3(user.profile_image)

            image = data['profile_image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return {'error': upload['errors']}

            user.profile_image = upload['url']

        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.about_me = data['about_me']
        user.location = data['location']

        db.session.commit()

        return user.to_dict()

    return {'Message': 'User Info was successfully edited'}

# delete user

@user_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_required(id):
    user = User.query.get(id)
    if (not user):
        return ('No User Found', 404)

    db.session.delete(user)
    db.session.commit()

    return {'User Successfully Deleted': id}
