from app import app
from part_categories.models import PartCategories


@app.route('/part_categories', methods=['GET'])
def read_all_part_categories():
    return PartCategories().read_all()


@app.route('/part_category', methods=['GET'])
def read_part_category():
    return PartCategories().read()


@app.route('/part_categories', methods=['POST'])
def write_part_category():
    return PartCategories().write()


@app.route('/part_categories', methods=['PUT'])
def update_part_categories():
    return PartCategories().update()