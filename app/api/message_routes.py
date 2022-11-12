# get all messages
from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_required
from app.models import db
from app.models.message import Message
from app.forms.message_form import MessageForm


message_routes = Blueprint('message', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all messages
@message_routes.route('', methods=['GET'])
@login_required
def get_all_messages():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}

# get all messages by conversation id
@message_routes.route('/conversations/<int:id>', methods = ['GET'])
@login_required
def get_message_by_conversation_id(id):
    messages = Message.query.filter_by(conversation_id=f'{id}')
    return {'conversation': [message.to_dict() for message in messages]}

# edit a message by id
@message_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_message(id):
    edit_message = Message.query.get(id)
    edit_message.body = request.json["body"]
    db.session.add(edit_message)
    db.session.commit()
    return edit_message.to_dict()

# delete a message by id
@message_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_message(id):
    delete_message = Message.query.get(id)
    # if not gettable, raise error saying cant find message
    db.session.delete(delete_message)
    db.session.commit()
    return 'Successfully deleted'
