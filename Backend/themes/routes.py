from themes.models import Themes
from flask import Blueprint

read_all_themes_blueprint = Blueprint('read_all_themes', __name__)
read_theme_blueprint = Blueprint('read_theme', __name__)
write_theme_blueprint = Blueprint('write_theme', __name__)
update_themes_blueprint = Blueprint('update_themes', __name__)

@read_all_themes_blueprint.route('/themes', methods=['GET'])
def read_all_themes():
    return Themes().read_all()


@read_theme_blueprint.route('/theme', methods=['GET'])
def read_theme():
    return Themes().read()


@write_theme_blueprint.route('/themes', methods=['POST'])
def write_theme():
    return Themes().write()


@update_themes_blueprint.route('/themes', methods=['PUT'])
def update_themes():
    return Themes().update()