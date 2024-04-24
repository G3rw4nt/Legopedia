from flask import jsonify, request
import database.databaseConnection


class PartCategories:

    @staticmethod
    def read_all():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            query = 'SELECT * FROM PART_CATEGORIES'
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
    def read():

        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.get_json()
            first_key = next(iter(data))
            first_value = data[first_key]
            query = "SELECT * FROM PART_CATEGORIES WHERE {} = %s".format(first_key)
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
    def write():
        try:
            conn, cursor = database.databaseConnection.DatabaseConnection().connect_to_db()
            data = request.get_json()
            query = 'INSERT INTO PART_CATEGORIES(NAME) VALUES (%s)'
            cursor.execute(query, (data["name"],))
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
            query = 'UPDATE PART_CATEGORIES SET NAME = %s WHERE ID = %s'
            cursor.execute(query, (data['name'], data['id']))
            updated_row_count = cursor.rowcount
            conn.commit()
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'Updated count: ': updated_row_count}), 200
        except Exception as e:
            conn.rollback()
            database.databaseConnection.DatabaseConnection.close_connection(conn, cursor)
            return jsonify({'status': 'error', 'message': str(e)}), 400


