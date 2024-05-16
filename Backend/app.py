from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'

import parts.routes
import sets.routes
import themes.routes
import part_categories.routes

app.register_blueprint(themes.routes.read_all_themes_blueprint)
app.register_blueprint(themes.routes.read_theme_blueprint)
app.register_blueprint(themes.routes.write_theme_blueprint)
app.register_blueprint(themes.routes.update_themes_blueprint)

app.register_blueprint(parts.routes.read_all_parts_blueprint)
app.register_blueprint(parts.routes.read_all_parts_paginated_blueprint)
app.register_blueprint(parts.routes.read_part_blueprint)
app.register_blueprint(parts.routes.write_part_blueprint)
app.register_blueprint(parts.routes.update_parts_blueprint)

app.register_blueprint(sets.routes.read_all_sets_blueprint)
app.register_blueprint(sets.routes.read_all_sets_paginated_blueprint)
app.register_blueprint(sets.routes.read_set_blueprint)
app.register_blueprint(sets.routes.write_set_blueprint)
app.register_blueprint(sets.routes.update_set_blueprint)
app.register_blueprint(sets.routes.read_sets_histogram_blueprint)

app.register_blueprint(part_categories.routes.read_all_part_categories_blueprint)
app.register_blueprint(part_categories.routes.read_part_category_blueprint)
app.register_blueprint(part_categories.routes.write_part_category_blueprint)
app.register_blueprint(part_categories.routes.update_part_categories_blueprint)

@app.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
@cross_origin()
def hello_world():
    return 'hello world'

if __name__ == '__main__':
    app.run(port=4000, host='0.0.0.0')
