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
  
    conversation_dict = {}
    found_conversations = Conversation.query.filter(or_(Conversation.sender_id == current_profile_id, Conversation.recipient_id == current_profile_id)).all()
    print(found_conversations)
    for match_id in matches_state_set:
        
        conversation = Conversation(
            recipient_id = match_id,
            sender_id = current_user.id
        )

        if(len(found_conversations) == 0):
            db.session.add(conversation)
            db.session.commit()
       
        for conv in found_conversations:
            if((conv.to_dict()["sender_id"] != conversation.to_dict()["sender_id"])
               or (conv.to_dict()["recipient_id"] != conversation.to_dict()["sender_id"])):
                db.session.add(conversation)
                db.session.commit()
               

    new_conversations = Conversation.query.filter(or_(Conversation.sender_id == current_profile_id, Conversation.recipient_id == current_profile_id)).all()
    print(new_conversations, "------------------")
    for conv in new_conversations:
        conversation_dict[conv.id] = conv.to_dict()
    return conversation_dict
    
   
#delete a conversation by id (similar to how blocking someone on a social media app would be?)
@conversation_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_conversation(id):
    delete_conversation = Conversation.query.get(id)
    db.session.delete(delete_conversation)
    db.session.commit()
    return 'Successfully deleted'
