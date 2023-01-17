from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField)
from wtforms.validators import DataRequired, Length

class PlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min = 1, max=20, message="Playlist name must be between 1-20 characters long")])
