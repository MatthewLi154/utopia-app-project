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
    matches = Match.query.filter_by(profile_id=current_user.id).all()
    for match in matches:
        match.to_dict()
        conversation = Conversation(
            sender_id = match.profile_id,
            recipient_id = match.matched_profile_id
        )
        db.session.add(conversation)
        db.session.commit()
    conversations = Conversation.query.filter((Conversation.recipient_id == current_user.id) | (Conversation.sender_id==current_user.id))
    conversation_dict = {}
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
