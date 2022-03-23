from sqlalchemy import create_engine, MetaData

DB_USER = "root"
DB_PASSWORD = "admin"
DB_HOST = "localhost"
DB_PORT = "3306"
DATABASE = "admin"


connect_string = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE)
#connect_string = 'mysql+pymysql://{}:{}@{}/{}?port={}?charset=utf8'.format(DB_USER, DB_PASSWORD, DB_HOST, DATABASE, DB_PORT)


engine = create_engine(connect_string)
meta = MetaData()
conn = engine.connect()