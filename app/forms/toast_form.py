from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class ToastForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    review_id = IntegerField('review_id', validators=[DataRequired()])