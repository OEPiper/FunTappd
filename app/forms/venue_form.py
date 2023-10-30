from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

class VenueForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    location = StringField("Location", validators=[DataRequired()])
    logo = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("User ID", validators=[DataRequired()])