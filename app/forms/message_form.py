from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models.message import Message

class MessageForm(FlaskForm):
    val = DataRequired()
    body = StringField('body', [val])
    user_sending_id = IntegerField('user_sending_id')
    # possible length validator at a later time
