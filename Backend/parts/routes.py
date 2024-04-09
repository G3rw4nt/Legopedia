from app import app
from parts.models import Parts

@app.route('/parts', methods=['GET'])
def read_all_parts():
    return Parts().read_all()

@app.route('/parts_paginated', methods=['GET'])
def read_all_parts_paginated():
    return Parts().read_all_paginated()


@app.route('/part', methods=['GET'])
def read_part():
    return Parts().read()


@app.route('/parts', methods=['POST'])
def write_part():
    return Parts().write()


@app.route('/parts', methods=['PUT'])
def update_parts():
    return Parts().update()