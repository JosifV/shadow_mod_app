from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import json

from queries import user_create_table, write_in_user, list_table_users
from db_defs import create_table, write_in_table, list_table

# * DB stuff
create_table(user_create_table) # create user table
write_in_table(write_in_user('user1')) # write in user table
list_table(list_table_users) # list user table

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
