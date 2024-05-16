from app import app
from part_categories.models import PartCategories
from flask import Blueprint


read_all_part_categories_blueprint = Blueprint('read_all_part_categories', __name__)
read_part_category_blueprint = Blueprint('read_part_category', __name__)    
write_part_category_blueprint = Blueprint('write_part_category', __name__)  
update_part_categories_blueprint = Blueprint('update_part_categories', __name__)    

@read_all_part_categories_blueprint.route('/part_categories', methods=['GET'])
def read_all_part_categories():
    return PartCategories().read_all()


@read_part_category_blueprint.route('/part_category', methods=['GET'])
def read_part_category():
    return PartCategories().read()


@write_part_category_blueprint.route('/part_categories', methods=['POST'])
def write_part_category():
    return PartCategories().write()


@update_part_categories_blueprint.route('/part_categories', methods=['PUT'])
def update_part_categories():
    return PartCategories().update()