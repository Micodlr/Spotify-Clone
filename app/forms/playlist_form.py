from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField)
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
