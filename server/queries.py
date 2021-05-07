
user_create_table = """ CREATE TABLE IF NOT EXISTS users (
                                        id integer PRIMARY KEY,
                                        name text NOT NULL,
                                        access bit 
                                    ); """


def write_in_user(user_name):
    return f"INSERT INTO users (name, access) VALUES('{user_name}', 1);"


list_table_users = " SELECT * FROM users"
