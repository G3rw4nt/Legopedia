import psycopg2


class DatabaseConnection:
    @staticmethod
    def connect_to_db():
        connection = None
        cursor = None
        try:
            connection = psycopg2.connect(
                database="db",
                host="baza_systemy_chmurowe",
                user="postgre",
                password="postgre",
                port="5432"
            )
            cursor = connection.cursor()
            return connection, cursor
        except Exception as e:
            if cursor is not None:
                cursor.close()
            if connection is not None:
                connection.close()
            return str(e)

    @staticmethod
    def close_connection(connection, cursor):
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()
