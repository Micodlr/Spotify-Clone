from flask_wtf import FlaskForm
from wtforms import (StringField,IntegerField, SubmitField)
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    songId = IntegerField("songId", validators=[DataRequired()])
