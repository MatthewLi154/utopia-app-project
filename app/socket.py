from flask_socketio import SocketIO, emit
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

@socketio.on("last_25_messages")
def last_25_mesages(data):
    match_id = data.match_id
    last25Mesages = Message.query.filter_by(matched_id=match_id).limit(25)
    messageObj = {}
    for messages in last25Mesages:
        messageObj[messages.id] = messages
    emit('last_25_messages', messageObj, broadcast=True)