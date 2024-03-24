from flask import jsonify, request
from app import cursor, conn


class Parts:

    @staticmethod
    def read_all():
        try:
            query = 'SELECT * FROM PARTS'
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
            data = request.args.to_dict()
            print(data)
            first_key = list(data.keys())[0]
            first_value = list(data.values())[0]
            query = "SELECT * FROM PARTS WHERE {} = %s".format(first_key)
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
            query = 'INSERT INTO PARTS(PART_NUM, NAME, PART_CAT_ID) VALUES (%s, %s, %s)'
            cursor.execute(query, (data["part_num"], data["name"], data["part_cat_id"]))

            conn.commit()
            return jsonify({'result': 'Success'}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({'status': 'error', 'message': str(e)}), 400
    @staticmethod
    def update():
        try:
            data = request.get_json()
            query = 'UPDATE PARTS SET NAME = %s, PART_CAT_ID = %s WHERE PART_NUM = %s'
            cursor.execute(query, (data['name'], data['part_cat_id'], data['part_num']))
            updated_row_count = cursor.rowcount
            conn.commit()
            return jsonify({'Updated count: ': updated_row_count}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({'status': 'error', 'message': str(e)}), 400


