from flask_socketio import SocketIO, emit, join_room, leave_room, send
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
    emit("chat", data, broadcast=True)

@socketio.on("join")
def last_25_messages(data):
    last25Messages = Message.query.filter(Message.matched_id==data['match']).order_by(Message.id.desc()).limit(25)
    messageObj = [message.to_dict() for message in last25Messages ]
    emit("last_25_messages", messageObj, broadcast=True)
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
    # send('has entered the room.', to=f'room{matched_room}')

# leave room function that will be called on the backend when??
@socketio.on('leave_room')
def on_leave(data):
    matched_room = data['match']
    leave_room(f'room{matched_room}')
    print('left successfully!!')
    # send(username + ' has left the room.', to=matched_room)

# @socketio.on("connection")
# def connection(data):
#     users = []
#     users.append({
#         "userId": data['id'],
#         "username": data['username']
#     })
#     emit('users', users)

#     emit("user-connected"), {
#         "userId": data['id'],
#         "username": data['username']
#     }

# @socketio.on("private-message")
# def private_message(data):
#     emit("private-message", {

#     })
