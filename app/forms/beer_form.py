from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired

class BeerForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    abv = DecimalField("ABV", validators=[DataRequired()])
    ibu = IntegerField("IBU", validators=[DataRequired()])
    user_id = IntegerField("User ID", validators=[DataRequired()])
    venue_id = IntegerField("Venue ID", validators=[DataRequired()])