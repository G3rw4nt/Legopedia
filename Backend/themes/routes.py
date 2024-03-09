from app import app
from themes.models import Themes


@app.route('/themes', methods=['GET'])
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