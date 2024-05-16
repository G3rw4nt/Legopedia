from app import app
from sets.models import Sets
from flask import Blueprint

read_all_sets_blueprint = Blueprint('read_all_sets', __name__)
read_all_sets_paginated_blueprint = Blueprint('read_all_sets_paginated', __name__)
read_set_blueprint = Blueprint('read_set', __name__)
write_set_blueprint = Blueprint('write_set', __name__)
update_set_blueprint = Blueprint('update_set', __name__)
read_sets_histogram_blueprint = Blueprint('read_sets_histogram', __name__)

@app.route('/sets', methods=['GET'])
def read_all_sets():
    return Sets().read_all()

@app.route('/sets_paginated', methods=['GET'])
def read_all_sets_paginated():
    return Sets().read_all_paginated()

@app.route('/set', methods=['GET'])
def read_set():
    return Sets().read()


@app.route('/sets', methods=['POST'])
def write_set():
    return Sets().write()


@app.route('/sets', methods=['PUT'])
def update_sets():
    return Sets().update()


@app.route('/sets/histogram', methods=['GET'])
def read_sets_histogram():
    return Sets().read_histogram_data()
    