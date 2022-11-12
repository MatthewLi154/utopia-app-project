# get all conversations
from flask import Blueprint, jsonify
from app.models.conversation import Conversation
from flask_login import current_user, login_required

conversation_routes = Blueprint('conversation', __name__)

@conversation_routes.route('', methods=['GET'])
@login_required
# update so that its only recipient id
def get_all_conversations():
    conversations = Conversation.query.all()
    parsed_conversations_dict = {}
    for conversation in conversations:
        parsed_conversations_dict[conversation.id] = vars(conversation)
        del parsed_conversations_dict[conversation.id]['_sa_instance_state']
    return parsed_conversations_dict

@
# remember cookie request thing
