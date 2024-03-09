from flask import Flask
import psycopg2
import os

app = Flask(__name__)
conn = psycopg2.connect(
    database=os.getenv('DATABASE'),
    host=os.getenv('HOST'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    port=os.getenv('PORT')
)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
