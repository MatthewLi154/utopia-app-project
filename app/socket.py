from flask_socketio import SocketIO, emit, join_room, leave_room, send, rooms
from .models.message import Message
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://aa-utopia.onrender.com/',
        'http://aa-utopia.onrender.com/'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, room=data['room'] )

@socketio.on("join")
def last_25_messages(data):
    last_25_messages = Message.query.filter(Message.matched_id==data['match']).order_by(Message.id.desc()).limit(25)
    last_25_messages = last_25_messages[::-1]
    message_list = [message.to_dict() for message in last_25_messages ]
    emit("last_25_messages", message_list)
# socket flow: socket.emit('join) emits from chat.js to sockio.on HERE
# then this socketio emits the 'last_25_messages' back to chat.js where its caught
# by socket.on("last 25 messages")


# a room will be denote by matched instance id??
@socketio.on("join_room")
def on_join(data):
    matched_room = data['match']
    # join_room(matched_room)
    join_room(f'room{matched_room}')
    print('joined successfully!!')
    print(rooms(sid=None, namespace=None))

    # build a route in message to get all matches based on something.send all those matched_id's. create redux state, matched_ids, key into matched_ids for a specific user


# leave room function that will be called on the backend off-focus
@socketio.on('leave_room')
def on_leave(data):
    matched_room = data['match']
    leave_room(f'room{matched_room}')
    print('left successfully!!')
    # print(rooms(sid=None, namespace=None))


        # if not (existing_match.to_dict()['profile_id'] == data['profile_id'] and existing_match.to_dict()['matched_profile_id'] == data['matched_profile_id']) or  not (existing_match.to_dict()['profile_id'] == data['matched_profile_id'] and existing_match.to_dict()['matched_profile_id'] == data['profile_id']):
