from flask import Blueprint, request
from app.models import db
from app.models.match import Match
from app.models.profile import Profile
from flask_login import login_required, current_user

matches_routes = Blueprint('matches', __name__)

@matches_routes.route('', methods=['POST'])
@login_required
def add_matches():
    # When user submits personality questions,
    # New profile with score will need to compare scores with existing profiles

    data = request.get_json()
    # add each dictionary from data list to match table as new match instance
    for match in data:
        newMatch = Match(profile_id=match['profile_id'], matched_profile_id=match['matched_profile_id'])
        db.session.add(newMatch)
    db.session.commit()

    # want to update state with new matched users state
    # matches state should look like this
    ## matches = {
    #     1: {profile_id: 1, matching_percentage: 0.6}
    #     2: {profile_id: 2, matching_percentage: 0.8}
    # }
    # matched_profiles = Match.query.filter_by(profile_id=data[0]['profile_id']).all()
    matched_profiles = Match.query.all()
    # profiles = Profile.query.filter_by()
    # print(list(matched_profiles))
    matched_profiles_dict = {}
    for matched in matched_profiles:
        matched_profiles_dict[matched.to_dict()['id']] = matched.to_dict()
    # print(matched_profiles_dict)

    current_user_id = current_user.to_dict()['id']
    current_profile = Profile.query.filter_by(user_id=current_user_id).first()
    current_profile_id = current_profile.to_dict()['id']
    print(current_profile_id)

    matches_state_set = set()
    for match_set in matched_profiles_dict:
        if matched_profiles_dict[match_set]['matched_profile_id'] not in matches_state_set:
            matches_state_set.add(matched_profiles_dict[match_set]['matched_profile_id'])
        if matched_profiles_dict[match_set]['matched_profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['profile_id'])
    print(matches_state_set)


    return matched_profiles_dict

@matches_routes.route('', methods=['GET'])
@login_required
def get_matches():
    # Fetch from matches table
    # create an object
    # query using current_user,
    # find all instances of profile_id = profile.id
    # find all instances of recipient_id = profile.id
    # return matches obj
    return { "message": "successful add" }
