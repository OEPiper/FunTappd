from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

class ReviewForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    text = StringField("Text", validators=[DataRequired()])
    photo = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("User ID", validators=[DataRequired()])
    beer_id = IntegerField("Beer ID", validators=[DataRequired()])