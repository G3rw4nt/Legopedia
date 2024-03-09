from app import app
from sets.models import Sets


@app.route('/sets', methods=['GET'])
def read_all_sets():
    return Sets().read_all()


@app.route('/set', methods=['GET'])
def read_set():
    return Sets().read()


@app.route('/sets', methods=['POST'])
def write_set():
    return Sets().write()


@app.route('/sets', methods=['PUT'])
def update_sets():
    return Sets().update()