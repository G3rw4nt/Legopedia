from parts.models import Parts
from flask import Blueprint

read_all_parts_blueprint = Blueprint('read_all_parts', __name__)
read_all_parts_paginated_blueprint = Blueprint('read_all_parts_paginated', __name__)
read_part_blueprint = Blueprint('read_part', __name__)
write_part_blueprint = Blueprint('write_part', __name__)
update_parts_blueprint = Blueprint('update_parts', __name__)

@read_all_parts_blueprint.route('/parts', methods=['GET'])
def read_all_parts():
    return Parts().read_all()

@read_all_parts_paginated_blueprint.route('/parts_paginated', methods=['GET'])
def read_all_parts_paginated():
    return Parts().read_all_paginated()


@read_part_blueprint.route('/part', methods=['GET'])
def read_part():
    return Parts().read()


@write_part_blueprint.route('/parts', methods=['POST'])
def write_part():
    return Parts().write()


@update_parts_blueprint.route('/parts', methods=['PUT'])
def update_parts():
    return Parts().update()