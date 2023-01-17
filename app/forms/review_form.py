from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField)
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired(), Length(min = 4, max=60, message="Review must be between at least  6 characters long")])
