from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

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
        user.username = data['username']
        user.email = data['email']
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.profile_image = data['profile_image']
        user.about_me = data['about_me']
        user.location = data['location']

        db.session.commit()
        return user.to_dict()
    return {'Message': 'User Info was successfully edited'}
