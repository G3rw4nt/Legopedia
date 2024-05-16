from app import app
from themes.models import Themes
from flask import Blueprint

read_all_themes_blueprint = Blueprint('read_all_themes', __name__)
@read_all_themes_blueprint.route('/themes', methods=['GET'])
def read_all_themes():
    return Themes().read_all()


@app.route('/theme', methods=['GET'])
def read_theme():
    return Themes().read()


@app.route('/themes', methods=['POST'])
def write_theme():
    return Themes().write()


@app.route('/themes', methods=['PUT'])
def update_themes():
    return Themes().update()