# get all messages
from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_required
from sqlalchemy import or_
from app.models import db
from app.models.match import Match
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
    parsed_message_dict = {}
    for message in messages:
        parsed_message_dict[message.id] = message.to_dict()
    return parsed_message_dict


# get all messages by match id
@message_routes.route('/matched/<int:id>', methods = ['GET'])
@login_required
def get_message_by_matched_id(id):
    messages = Message.query.filter_by(matched_id=f'{id}')
    parsed_message_dict = {}
    for message in messages:
        parsed_message_dict[message.id] = message.to_dict()
    return parsed_message_dict

# create a conversation based on if session user id is either profile_id or matched_profile_id
@message_routes.route('/matches', methods = ['GET'])
@login_required
def get_matches():
    id = current_user.id
    matches = Match.query.filter(or_(Match.profile_id==id, Match.matched_profile_id==id)).all()
    parsed_matches_dict = {}
    for match in matches:
        parsed_matches_dict[match.id] = match.to_dict()
    return parsed_matches_dict


@message_routes.route('/matched/<int:id>', methods=['POST'])
@login_required
def create_message_by_matched_id(id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            body=form.data["body"],
            user_sending_id=form.data['user_sending_id'],
            matched_id=f'{id}'
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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
    return {"message":"Successfully deleted"}
    # return "Successfully deleted"
