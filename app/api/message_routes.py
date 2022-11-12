# get all messages
from flask import Blueprint, jsonify
from app.models.message import Message
from flask_login import current_user, login_required

message_routes = Blueprint('message', __name__)

@message_routes.route('', methods=['GET'])
@login_required
def get_all_messages():
    messages = Message.query.all()
    parsed_messages_dict = {}
    for message in messages:
        parsed_messages_dict[message.id] = vars(message)
        del parsed_messages_dict[message.id]['_sa_instance_state']
    return parsed_messages_dict
