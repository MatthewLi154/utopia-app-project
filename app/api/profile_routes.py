from flask import Blueprint, jsonify
from app.models import User
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
    pass

@profile_routes.route("/create", methods=['GET'])
@login_required
def profile_form():
    pass
