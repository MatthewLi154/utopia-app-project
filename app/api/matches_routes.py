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
    print('THIS IS MATCHES DATA', data)
    # add each dictionary from data list to match table as new match instance
    Match.query.delete()
    for match in data:
        newMatch = Match(profile_id=match['profile_id'], matched_profile_id=match['matched_profile_id'])
        db.session.add(newMatch)
    db.session.commit()

    matched_profiles = Match.query.all()
    matched_profiles_dict = {}
    for matched in matched_profiles:
        matched_profiles_dict[matched.to_dict()['id']] = matched.to_dict()

    current_user_id = current_user.to_dict()['id']
    current_profile = Profile.query.filter_by(user_id=current_user_id).first()
    current_profile_id = current_profile.to_dict()['id']
    print(current_profile_id)

    matches_state_set = set()
    for match_set in matched_profiles_dict:
        if matched_profiles_dict[match_set]['matched_profile_id'] not in matches_state_set and matched_profiles_dict[match_set]['profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['matched_profile_id'])
        if matched_profiles_dict[match_set]['matched_profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['profile_id'])
    print(matches_state_set)

    # Get current profile score
    current_profile_score = current_profile.to_dict()['score']

    # for each profile id, get score then calculate match percentage
    # return match profile id and respective match percentage in dictionary where match profile id is key of dict
    match_percent_dict = {}
    for profile_id in matches_state_set:
        print(profile_id)
        match_profile = Profile.query.filter_by(id=profile_id).first()
        if match_profile:
            match_profile_score = match_profile.to_dict()['score']
            if match_profile_score > current_profile_score:
                matching_percentage = current_profile_score / match_profile_score
            else:
                matching_percentage = match_profile_score / current_profile_score
        match_percent_dict[profile_id] = {
            "matched_profile_id": profile_id,
            "matching_percentage": matching_percentage
        }

    return match_percent_dict

@matches_routes.route('/match-percent', methods=['GET'])
@login_required
def get_match_percent():
    matched_profiles = Match.query.all()
    matched_profiles_dict = {}
    for matched in matched_profiles:
        matched_profiles_dict[matched.to_dict()['id']] = matched.to_dict()

    current_user_id = current_user.to_dict()['id']
    current_profile = Profile.query.filter_by(user_id=current_user_id).first()
    current_profile_id = current_profile.to_dict()['id']
    print(current_profile_id)

    matches_state_set = set()
    for match_set in matched_profiles_dict:
        if matched_profiles_dict[match_set]['matched_profile_id'] not in matches_state_set and matched_profiles_dict[match_set]['profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['matched_profile_id'])
        if matched_profiles_dict[match_set]['matched_profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['profile_id'])

    # Get current profile score
    current_profile_score = current_profile.to_dict()['score']

    # for each profile id, get score then calculate match percentage
    # return match profile id and respective match percentage in dictionary where match profile id is key of dict
    match_percent_dict = {}
    for profile_id in matches_state_set:
        print(profile_id)
        match_profile = Profile.query.filter_by(id=profile_id).first()
        if match_profile:
            match_profile_score = match_profile.to_dict()['score']
            if match_profile_score > current_profile_score:
                matching_percentage = current_profile_score / match_profile_score
            else:
                matching_percentage = match_profile_score / current_profile_score
        match_percent_dict[profile_id] = {
            "matched_profile_id": profile_id,
            "matching_percentage": matching_percentage
        }

    return match_percent_dict


@matches_routes.route('', methods=['GET'])
@login_required
def get_matches():

    matched_profiles = Match.query.all()

    matched_profiles_dict = {}
    for matched in matched_profiles:
        matched_profiles_dict[matched.to_dict()['id']] = matched.to_dict()

    current_user_id = current_user.to_dict()['id']
    current_profile = Profile.query.filter_by(user_id=current_user_id).first()
    current_profile_id = current_profile.to_dict()['id']

    matches_state_set = set()
    for match_set in matched_profiles_dict:
        if matched_profiles_dict[match_set]['matched_profile_id'] not in matches_state_set and matched_profiles_dict[match_set]['profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['matched_profile_id'])
        if matched_profiles_dict[match_set]['matched_profile_id'] == current_profile_id:
            matches_state_set.add(matched_profiles_dict[match_set]['profile_id'])

    matched_profiles_state = {}
    for profile_id in matches_state_set:
        profile_match = Profile.query.filter_by(id=profile_id).first()
        matched_profiles_state[profile_id] = profile_match.to_dict()

    return matched_profiles_state
