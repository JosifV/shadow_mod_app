import sqlite3
from sqlite3 import Error

db_uri = "C:/Users/jvc/Projekti/primeri/react-ts-flask/server/db/tut.db"

def create_table(query):
    try:
        conn = sqlite3.connect(db_uri)
        conn.cursor().execute(query)
    except Error as e:
        print(e)
    # finally:
        # if conn:
            # conn.close()
        
def write_in_table(query):
    try:
        conn = sqlite3.connect(db_uri)
        conn.cursor().execute(query)
    except Error as error:
        print(error)
    # finally:
        # if conn:
            # conn.close()
            
def list_table(query):
    try:
        conn = sqlite3.connect(db_uri)
        res = conn.cursor().execute(query).fetchall()
        print(res)
        for x in res:
            print(x)
        return res
    except Error as error:
        print(error)
    # finally:
        # if conn:
            # conn.close()        