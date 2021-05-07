import psycopg2

def db_insert_in_table(query):
    resp = {'status': 200, 'msg': 'success'}
    #Establishing the connection
    conn = psycopg2.connect(
    database="tut_db", user='postgres', password='Jozhe$$$1987', host='127.0.0.1', port= '5432'
    )
    #Setting auto commit false
    conn.autocommit = True

    #Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    try:
        # Preparing SQL queries to INSERT a record into the database.
        cursor.execute(query)

        # Commit your changes in the database
        conn.commit()
        print("Records inserted........")
    except Error as err:
        resp = {'status': 400, 'msg': err}

    finally: 
        if conn:
            # Closing the connection
            conn.close()
    return resp