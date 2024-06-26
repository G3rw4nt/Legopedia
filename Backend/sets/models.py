import psycopg2
from flask import jsonify, request
import database.databaseConnection


class Sets:

    @staticmethod
    def read_all():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            query = 'SELECT * FROM SETS'
            cursor.execute(query)
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400
        
    @staticmethod
    def read_all_paginated():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.args.to_dict()
            page = int(data['page'])
            per_page = int(data['per_page'])
            query = ('SELECT s.*, t.name as THEME_NAME FROM SETS s JOIN THEMES t on s.theme_id = t.id ORDER BY SET_NUM '
                     'LIMIT %s OFFSET %s')
            cursor.execute(query, (per_page, (page - 1) * per_page))
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.args.to_dict()
            print(data)
            first_key = list(data.keys())[0]
            first_value = list(data.values())[0]
            print(first_key, first_value)
            query = "SELECT * FROM SETS WHERE {} = %s".format(first_key)
            cursor.execute(query, (first_value,))
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400
        
    @staticmethod
    def read_histogram_data():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            query = "SELECT year, COUNT(*) FROM SETS GROUP BY year ORDER BY year ASC"
            cursor.execute(query)
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.get_json()
            query = 'INSERT INTO SETS(SET_NUM, NAME, YEAR, THEME_ID, NUM_PARTS) VALUES (%s, %s, %s, %s, %s)'
            cursor.execute(query, (data["set_num"], data["name"], data["year"], data["theme_id"], data["num_parts"]))
            conn.commit()
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'result': 'Success'}), 200
        except Exception as e:
            conn.rollback()
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400
    @staticmethod
    def update():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.get_json()
            print(data)
            query = 'UPDATE SETS SET NAME = %s, YEAR = %s, THEME_ID = %s, NUM_PARTS = %s WHERE SET_NUM = %s'
            cursor.execute(query, ( data["name"], data["year"], data["theme_id"], data["num_parts"], data["set_num"]))
            updated_row_count = cursor.rowcount
            conn.commit()
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'Updated count: ': updated_row_count}), 200
        except Exception as e:
            conn.rollback()
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400


