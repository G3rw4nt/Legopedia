from flask import Flask
import psycopg2
import os

app = Flask(__name__)
print(os.getenv('DATABASE'))
conn = psycopg2.connect(
    host=os.getenv('HOST'),
    user=os.getenv('USER'),
    password=os.getenv('PASSWORD'),
    port=os.getenv('PORT')
)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
