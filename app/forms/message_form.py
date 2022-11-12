from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models.message import Message

class MessageForm(FlaskForm):
    val = DataRequired()
    body = StringField('body', [val])
    # possible length validator at a later time
