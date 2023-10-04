from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class VenueForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    location = StringField("Location", validators=[DataRequired()])
    user_id = IntegerField("User ID", validators=[DataRequired()])