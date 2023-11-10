from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

class BeerForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    type = StringField("Type")
    abv = DecimalField("ABV", validators=[DataRequired()])
    ibu = IntegerField("IBU", validators=[DataRequired()])
    description = StringField("Description")
    photo = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("User ID", validators=[DataRequired()])
    venue_id = IntegerField("Venue ID", validators=[DataRequired()])