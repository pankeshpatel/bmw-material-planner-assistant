from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

dbUser = Table('users', meta,
    Column('id', Integer, primary_key=True),
    Column('name', String(255)),          
    Column('email', String(255)),
    Column('password', String(255))
    )

dbExceptionMessage = Table("ExceptionMessage", meta, 
                Column('exceptionID', Integer, primary_key=True),
                Column('message', String(225))                
            )

meta.create_all(engine) 