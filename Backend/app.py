from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'

import part_categories.routes
import parts.routes
import sets.routes
import themes.routes
@app.route('/api', methods=['GET', 'POST', 'PUT', 'DELETE'])
@cross_origin()
def hello_world():
    return 'hello world'

if __name__ == '__main__':
    app.run(port=4000, host='0.0.0.0', debug=True)
