from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import json

# * DB stuff
import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
        print(sqlite3.version)
    except Error as e:
        print(e)
    # finally:
        # if conn:
            # conn.close()
            
def create_table(conn, query):
    try:
        c = conn.cursor()
        c.execute(query)
    except Error as e:
        print(e)
        
def write_in_table(conn, query):
    try:
        c = conn.cursor()
        c.execute(query)
    except Error as error:
        print(error)
        
def list_table(conn, query):
    try:
        c = conn.cursor()
        res = c.execute(query)
        for x in res:
            print(x)
        return res
    except Error as error:
        print(error)
        
user_create_table = """ CREATE TABLE IF NOT EXISTS users (
                                        id integer PRIMARY KEY,
                                        name text NOT NULL,
                                        access bit 
                                    ); """
write_in_user = """ INSERT INTO users (name, access)
                    VALUES( 'user1', 1);
"""
list_table_users = " SELECT * FROM users"

conn = create_connection("C:/Users/jvc/Projekti/primeri/react-ts-flask/server/db/tut.db")
create_table(conn, user_create_table) # create user table
write_in_table(conn, write_in_user) # write in user table
list_table(conn, list_table_users) # list user table

#**
app = Flask(__name__)  # initialize flask app
CORS(app)

@app.route('/')
def base():
    return "Hello World"


@app.route('/upload', methods=['POST'])
def file_controler():
    uploaded_file = request.files['file']  # accept uploaded file
    parse = pd.read_excel(uploaded_file)  # pandas parse excel file
    data_frame = pd.DataFrame(parse)  # make pandas data frame
    print(data_frame)

    # to make binar dummies out of column
    # to avoid multicollinearity issues in prediction model, drop the 0 column with 'drop_first=True'
    a_dummies = pd.get_dummies(data_frame['A'], drop_first=True)
    print(a_dummies)

    response = {'file': data_frame.to_json()}
    response = json.dumps(response)
    return response


if __name__ == "__main__":
    app.run(debug=True)
