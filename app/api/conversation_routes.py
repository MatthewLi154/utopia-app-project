# get all conversations
from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_required
from sqlalchemy import or_
from app.models import db
from app.models.conversation import Conversation
from app.models.match import Match
from app.models.profile import Profile
from app.models.message import Message
from app.forms.message_form import MessageForm

conversation_routes = Blueprint('conversation', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all conversations by sender id
# @conversation_routes.route('', methods=['GET'])
# @login_required
# def get_all_conversations():
#     conversations = Conversation.query.filter_by(sender_id=current_user.id)
#     parsed_conversation_dict = {}
#     for conversation in conversations:
#         parsed_conversation_dict[conversation.id] = conversation.to_dict()
#     return parsed_conversation_dict

# @conversation_routes.route('', methods = ['GET'])
# @login_required
# def get_matched_conversations():


# create a new message based on conversation id
@conversation_routes.route('/<int:id>', methods = ['POST'])
@login_required
def create_message(id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            body = form.data["body"],
            conversation_id = f'{id}'
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# query all matches
# for every match, create a new conversation

# create a new conversation when a new match is made
# be careful where we put this post
@conversation_routes.route('', methods = ['GET'])
@login_required
def create_conversation():
    # create set based on Matches by user id
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
            matches_state_set.add(
                matched_profiles_dict[match_set]['matched_profile_id'])
        if matched_profiles_dict[match_set]['matched_profile_id'] == current_profile_id:
            matches_state_set.add(
                matched_profiles_dict[match_set]['profile_id'])
  
    # global variable to dynmically render different information
    conversation_dict = {}
    for match in matches_state_set:
        matched_id = match
        
        # create new instance of conversation based on set of unique matched ID's
        conversation = Conversation(
            sender_id = current_profile_id,
            recipient_id = matched_id
        )

        conversations = Conversation.query.all()
        for conversation in conversations:
            # if conditional to check if there are already sender_id and recipien_id pairs
            if(conversation.recipient_id == matched_id and conversation.sender_id == current_profile_id):
                for conversation in conversations:
                    # will only return old unique pairs
                    conversation_dict[conversation.id] = conversation.to_dict()
                    
        # if there isnt any unique pairs then add that instance to the DB
        db.session.add(conversation)
        db.session.commit()
    conversations = Conversation.query.filter_by(sender_id = current_profile_id)
    for conversation in conversations:
        conversation_dict[conversation.id] = conversation.to_dict()
    return conversation_dict

#delete a conversation by id (similar to how blocking someone on a social media app would be?)
@conversation_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_conversation(id):
    delete_conversation = Conversation.query.get(id)
    db.session.delete(delete_conversation)
    db.session.commit()
    return 'Successfully deleted'
