import psycopg2

def db_create_table(table_name):
    #Establishing the connection
    conn = psycopg2.connect(
    database="tut_db", user='postgres', password='Jozhe$$$1987', host='127.0.0.1', port= '5432'
    )
    #Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    #Doping users table if already exists.
    # cursor.execute("DROP TABLE IF EXISTS users")

    try:
        #Creating table as per requirement
        sql =f'''CREATE TABLE "{table_name}" (
                id serial PRIMARY KEY,
                name text NOT NULL,
                access integer 
            )'''
        cursor.execute(sql)
        print("Table created successfully........")
    except Error as err:
        resp = {'status': 400, 'msg': err}

    finally: 
        if conn:
            # Closing the connection
            conn.close()
    return resp