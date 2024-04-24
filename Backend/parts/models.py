import psycopg2
from flask import jsonify, request
import database.databaseConnection


class Parts:

    @staticmethod
    def read_all():
        try:
            db = database.databaseConnection.DatabaseConnection().connect_to_db()
            cursor = db[1]
            query = 'SELECT * FROM PARTS'
            cursor.execute(query)
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection().close_connection(db[0], db[1])
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection().close_connection(db[0], db[1])
            return jsonify({'status': 'error', 'message': str(e)}), 400
        
    @staticmethod
    def read_all_paginated():
        try:
            conn,cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.args.to_dict()
            print(data)
            page = int(data['page'])
            per_page = int(data['per_page'])
            query = ('SELECT p.*, pc.name as part_cat_name FROM PARTS p JOIN part_categories pc '
                     'on p.part_cat_id = pc.id'
                     '  ORDER BY PART_NUM LIMIT %s OFFSET %s')
            cursor.execute(query, (per_page, (page - 1) * per_page))
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.args.to_dict()
            print(data)
            first_key = list(data.keys())[0]
            first_value = list(data.values())[0]
            query = "SELECT * FROM PARTS WHERE {} = %s".format(first_key)
            cursor.execute(query, (first_value,))
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [{columns[i]: value for i, value in enumerate(row)} for row in rows]
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify(results), 200
        except Exception as e:
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400
    @staticmethod
    def write():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.get_json()
            query = 'INSERT INTO PARTS(PART_NUM, NAME, PART_CAT_ID) VALUES (%s, %s, %s)'
            cursor.execute(query, (data["part_num"], data["name"], data["part_cat_id"]))
            conn.commit()
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify({'result': 'Success'}), 200
        except Exception as e:
            conn.rollback()
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400
    @staticmethod
    def update():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.get_json()
            query = 'UPDATE PARTS SET NAME = %s, PART_CAT_ID = %s WHERE PART_NUM = %s'
            cursor.execute(query, (data['name'], data['part_cat_id'], data['part_num']))
            updated_row_count = cursor.rowcount
            conn.commit()
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify({'Updated count: ': updated_row_count}), 200
        except Exception as e:
            conn.rollback()
            database.databaseConnection.DatabaseConnection().close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400


