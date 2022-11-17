from flask import Blueprint, jsonify, request
from app.models import User, db
from app.models.profile import Profile
from flask_login import current_user, login_required


profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/<id>', methods=['PUT'])
@login_required
def edit_profile(id):
    profile = Profile.query.filter_by(id=id).first()
    # del parsed_profile['_sa_instance_state']
    data = request.get_json()

    # Update parsed_profile with request body data
    # profile.first_name = data['first_name']
    # profile.last_name = data['last_name']
    profile.bio = data['bio']
    profile.current_goals = data['current_goals']
    profile.languages = data['languages']
    profile.location = data['location']
    profile.kids = data['kids']
    profile.pets = data['pets']
    profile.hobbies = data['hobbies']
    profile.identify_as = data['identify_as']
    profile.looking_for = data['looking_for']

    db.session.commit()
    return profile.to_dict()


@profile_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_profile(id):
    profile = Profile.query.filter_by(id=id).first()
    db.session.delete(profile)
    db.session.commit()
    return {"message": "Successfully deleted"}



@profile_routes.route('', methods=['GET'])
# @login_required
def user_profile():
    user_profiles = Profile.query.all()
    parsed_user_dict = {}
    for profile in user_profiles:
        parsed_user_dict[profile.id] = profile.to_dict()
    return parsed_user_dict


@profile_routes.route('/<id>', methods=['GET'])
@login_required
def single_user_profile(id):
    profile = Profile.query.filter_by(id=id).first()
    return profile.to_dict()


@profile_routes.route('', methods=['POST'])
# @login_required
def create_profile():
    """
    This method will take in profile infomration that user inputs
    from the form and store it into the data base, then
    redirect them to their profile page
    """
    data = request.get_json()
    new_profile = Profile(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        birthday=data['birthday'],
        location=data['location'],
        bio=data['bio'],
        current_goals=data['current_goals'],
        languages = data['languages'],
        kids = data['kids'],
        pets = data['pets'],
        hobbies = data['hobbies'],
        identify_as=data['identify_as'],
        looking_for=data['looking_for'],
        img_url1=data['img_url1'],
        img_url2=data['img_url2'],
        img_url3=data['img_url3']

    )
    db.session.add(new_profile)
    db.session.commit()
    return data

@profile_routes.route("/<id>/personality-questions", methods=['PUT'])
def get_personality_score(id):

    # Recieve data from request (should be the score of the questions)
    data = request.get_json()
    print(data)
    profile = Profile.query.filter_by(id=id).first()
    profile.score = data['score']
    db.session.commit()

    # Return to matches page
    return {"message": "Successfully updated"}
