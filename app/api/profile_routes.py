from flask import Blueprint, jsonify, request
from app.models import User, db
from app.models.profile import Profile
from flask_login import current_user, login_required

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('', methods=['GET'])
@login_required
def user_profile():
    user_profiles = Profile.query.all()
    print(user_profiles)
    parsed_user_dict = {}
    for profile in user_profiles:
        parsed_user_dict[profile.id] = vars(profile)
        del parsed_user_dict[profile.id]['_sa_instance_state']
    return parsed_user_dict

@profile_routes.route('', methods=['POST'])
@login_required
def create_profile():
    """
    This method will take in profile infomration that user inputs
    from the form and store it into the data base, then
    redirect them to their profile page
    """
    data = request.get_json()
    print(data)
    new_profile = Profile(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        birthday=data['birthday'],
        location=data['location'],
        bio=data['bio'],
        identify_as=data['identify_as'],
        looking_for=data['looking_for'],
        img_url=data['img_url']
    )
    db.session.add(new_profile)
    db.session.commit()
    return data
