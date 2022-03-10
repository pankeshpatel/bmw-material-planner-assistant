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

dbMaterialMaster = Table("MaterialMaster", meta, 
                Column('material', String(255), primary_key=True),
                Column('material_9', String(255)),
                Column('material_7', String(255)),
                Column('mat_description', String(255)),
                Column('mat_description_eng', String(255)),
                Column('plant', String(255)),
                Column('planner', String(255)),
                Column('safety_stock', String(255))
    )

dbPlanner = Table ( "Planner", meta,
                  Column("material", String(225)),
                  Column("mrpcnt", String(225)),
                  Column("mrpname", String(225)),
                  Column("email", String(225))
)
                  
    


meta.create_all(engine) 