from flask import Flask, send_file, request, Response, url_for, jsonify, redirect
from flask_cors import CORS
import pandas as pd
import json


# import mysql.connector
# import psycopg2

# from db_create_table import db_create_table
from db_insert_in_table import db_insert_in_table
from db_queries import write_in_user

# db_create_table('users')
# db_insert_in_table(write_in_user('user1'))
# #establishing the connection
# conn = psycopg2.connect(
#    database="postgres", user='postgres', password='Jozhe$$$1987', host='127.0.0.1', port= '5432'
# )
# #Creating a cursor object using the cursor() method
# cursor = conn.cursor()

# #Executing an MYSQL function using the execute() method
# cursor.execute("select version()")

# # Fetch a single row using fetchone() method.
# data = cursor.fetchone()
# print("Connection established to: ",data)

# #Closing the connection
# conn.close()

# * DB stuff
# from queries import user_create_table, write_in_user, list_table_users
# from db_defs import create_table, write_in_table, list_table

# create_table(user_create_table) # create user table
# write_in_table(write_in_user('user1')) # write in user table
# list_table(list_table_users) # list user table

#**
app = Flask(__name__)  # initialize flask app
CORS(app)

@app.route('/')
def base():
    return send_file('../client/build/index.html', 'text/html'), 200
    # return "Hello World"

@app.route('/create_user/<user_name>')
def create_user(user_name):
    res = db_insert_in_table(write_in_user(user_name))
    return res

@app.route('/fetch')
def file_controler():
    # uploaded_file = request.files['file']  # accept uploaded file
    # parse = pd.read_excel(uploaded_file)  # pandas parse excel file
    #*
    # df = pd.read_excel (r'Path where the Excel file is stored\File name.xlsx')
    parse = pd.read_excel('./file/empl.xlsx')  # pandas parse excel file
    data_frame = pd.DataFrame(parse)  # make pandas data frame
    # print(data_frame)

    #* to make binar dummies out of column
    #* to avoid multicollinearity issues in prediction model, drop the 0 column with 'drop_first=True'
    # a_dummies = pd.get_dummies(data_frame['A'], drop_first=True)
    # print(a_dummies)

    response = {'file': data_frame.to_json()}
    response = json.dumps(response)
    return response

@app.route('/hover/<id>/<val>', methods=['POST'])
def hover(id, val):
    #todo 
    return json.dumps({'status': 200, 'msg':{'id':id, 'val':val}})

@app.route('/click/<id>', methods=['POST'])
def click(id):
    #todo 
    return json.dumps({'status': 200, 'msg':{'id':id}})

if __name__ == "__main__":
    app.run(debug=True)
