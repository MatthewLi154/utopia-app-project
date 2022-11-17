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
    print('@@@@@@@@@@@@@@@@@@@@@@hitting it')
    room_id=data['room']
    emit("chat", data, room=f'room{room_id}' )

@socketio.on("fetch")
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
    matched_room_id = data['match']
    # join_room(matched_room)
    join_room(f'room{matched_room_id}')
    print('joined successfully!!')
    print(rooms(sid=None, namespace=None))


# leave room function that will be called on the backend off-focus
@socketio.on('leave_room')
def on_leave(data):
    matched_room_id = data['match']
    leave_room(f'room{matched_room_id}')
    print('left successfully!!')
    print(rooms(sid=None, namespace=None))
