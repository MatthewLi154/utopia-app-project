# get all conversations
from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_required
from app.models import db
from app.models.conversation import Conversation
from app.models.match import Match
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

# get all conversations
@conversation_routes.route('', methods=['GET'])
@login_required
# figure out whether sender_id or recipient_id
def get_all_conversations():
    conversations = Conversation.query.filter_by(sender_id=current_user.id)
    print('THIS IS IT', current_user.id)
    return {'all_conversations':[conversation.to_dict() for conversation in conversations]}

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
@conversation_routes.route('', methods = ['POST'])
@login_required
def create_conversation():
    matches = Match.query.filter_by(user_id=current_user.id).all()
    for match in matches:
        match.to_dict()
        conversation = Conversation(
            sender_id = match.user_id,
            recipient_id = match.matched_user_id
        )
        db.session.add(conversation)
        db.session.commit()
    conversations = Conversation.query.all()
    return {'conversations': [conversation.to_dict() for conversation in conversations]}
