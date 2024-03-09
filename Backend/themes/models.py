from flask import jsonify, request
from app import cursor, conn


class Themes:

    @staticmethod
    def read_all():
        try:
            query = 'SELECT * FROM THEMES'
            cursor.execute(query)
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            return jsonify(results), 200
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            first_key = next(iter(data))
            first_value = data[first_key]
            query = "SELECT * FROM THEMES WHERE {} = %s".format(first_key)
            cursor.execute(query, (first_value,))
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            return jsonify(results), 200
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
    @staticmethod
    def write():
        try:
            data = request.get_json()
            query = 'INSERT INTO THEMES(NAME, PARENT_ID) VALUES (%s, %s)'
            cursor.execute(query, (data["name"], data["parent_id"]))

            conn.commit()
            return jsonify({'result': 'Success'}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({'status': 'error', 'message': str(e)}), 400
    @staticmethod
    def update():
        try:
            data = request.get_json()
            query = 'UPDATE THEMES SET NAME = %s, PARENT_ID = %s WHERE ID = %s'
            cursor.execute(query, (data["name"], data["parent_id"], data["id"]))
            updated_row_count = cursor.rowcount
            conn.commit()
            return jsonify({'Updated count: ': updated_row_count}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({'status': 'error', 'message': str(e)}), 400


