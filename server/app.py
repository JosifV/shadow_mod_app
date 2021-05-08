from flask import Flask, send_file, request, Response, url_for, jsonify, redirect
from flask_cors import CORS
import pandas as pd
import json

from db_insert_in_table import db_insert_in_table
from db_queries import write_in_user
# import unicodedata
# from numba.cpython.unicode import unicode_str

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

@app.route('/hover/<id>/<val>/<title>', methods=['POST'])
def hover(id, val, title):
    #todo 
    parse = pd.read_excel('./file/empl.xlsx')  # pandas parse excel file
    data_frame = pd.DataFrame(parse)  # make pandas data frame
    data_frame[title][3] += int(val)
    data_frame.to_excel('./file/empl.xlsx', index=False)  
    
    return json.dumps({'status': 200, 'msg':{'id':id, 'val':val}})

@app.route('/click/<id>/<title>', methods=['POST'])
def click(id, title):
    #todo 
    print('KLIK ######')
    parse = pd.read_excel('./file/empl.xlsx')  # pandas parse excel file
    data_frame = pd.DataFrame(parse)  # make pandas data frame
    data_frame[title][2] += 1
    # print(data_frame)
    #header=False, 
    data_frame.to_excel('./file/empl.xlsx', index=False)  
    
    return json.dumps({'status': 200, 'msg':{'id':id}})

if __name__ == "__main__":
    app.run(debug=True)
    
# Pharmacist - ime / heder
# energetics - kontekst
# #new  #bio  #life  #past - tagovi
# 0 - klik
# 0 - hover
# 11 - prioritet