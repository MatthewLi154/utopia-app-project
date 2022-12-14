from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/email/<email>')
def get_user(email):
    """
    Query for user by email and returns that user id a dictionary
    """
    print('@@@@@@@@@@@@@@@@@@@', email)
    user = User.query.filter_by(email=email).first()
    print(user)
    return user.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def user_delete(id):
    """
    Delete user by id
    """
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return {"message": "Successfully deleted"}
