from flask import Flask, send_file, request, url_for, jsonify, redirect
from flask_cors import CORS
import pandas as pd
import json

#* Auth
# from authlib.integrations.flask_client import OAuth
from flask_dance.contrib.github import make_github_blueprint, github

from queries import user_create_table, write_in_user, list_table_users
from db_defs import create_table, write_in_table, list_table

# * DB stuff
create_table(user_create_table) # create user table
write_in_table(write_in_user('user1')) # write in user table
list_table(list_table_users) # list user table

#**
app = Flask(__name__)  # initialize flask app
CORS(app)
#* Auth
# oauth = OAuth(app) 
# github = oauth.register('github')
app.secret_key = "supersekrit"
blueprint = make_github_blueprint(
    client_id="c95acd3d3900581c3aa8",
    client_secret="79cd47c5720d1c4587e3e0da6b22210dbae5f1b6",
)
app.register_blueprint(blueprint, url_prefix="/login")

@app.route('/')
def base():
    if not github.authorized:
        return redirect(url_for("github.login"))
    resp = github.get("/user")
    assert resp.ok
    return send_file('../client/build/index.html', 'text/html'), 200
    # return "You are @{login} on GitHub".format(login=resp.json()["login"])
    # redirect_uri = url_for('authorize', _external=True)
    # return github.authorize_redirect(redirect_uri)
    # return "Hello World"
    
@app.route('/auth')
def authorize():
    token = github.authorize_access_token()
    # you can save the token into database
    profile = github.get('/user', token=token)
    return jsonify(profile)

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
