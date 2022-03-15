from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Date
from config.db import meta, engine


users = Table(
    'User',
    meta,   
    Column('username', String(45)),
    Column('password', String(255))   
)

dbExceptionMessage = Table(
                    "ExceptionMessage", 
                    meta, 
                    Column('exceptionID', Integer, primary_key=True),
                    Column('message', String(225))                
                )

dbMaterialMaster = Table(
                        "MaterialMaster", 
                        meta, 
                        Column('material', String(255), primary_key=True),
                        Column('material_9', String(255)),
                        Column('material_7', String(255)),
                        Column('mat_description', String(255)),
                        Column('mat_description_eng', String(255)),
                        Column('plant', String(255)),
                        Column('planner', String(255)),
                        Column('safety_stock', String(255))
                    )

dbPlanner = Table ( 
                   "Planner", 
                   meta,
                   Column("material", String(225)),
                   Column("mrpcnt", String(225)),
                   Column("mrpname", String(225)),
                   Column("email", String(225))
                )

dbHealthScore = Table (
                    "HealthScore", 
                    meta,
                    Column("materialID", String(225)),
                    Column("healthscoredate", DateTime()),
                    Column("healthstatus", String(225)),
                    Column("suppliernumber", String(225)),
                    Column("partdescription", String(225)),
                    Column("partdescriptioneng", String(225)),
                    Column("plant", String(225)),
                    Column("safetystock", Integer),
                    Column("storagelocation", String(225)) 
                )

dbExceptionManager = Table (
                    "ExceptionManager", 
                    meta,
                    Column('exceptionID', Integer, primary_key=True),
                    Column('message', String(225)),
                    Column('count', String(225)),
                    Column('percentage', String(225))
                )

dbmd04 = Table(
            "MD04",
            meta,
            Column("materialID", String(225)),
            Column("plant", String(225)),
            Column("demand_date", String(225)),
            Column("mrp_element", String(225)),
            Column("change_quantity", Integer),
            Column("total_quantity", Integer),
            Column("storage_location", String(225)),
            Column("supplier_nr", String(225)),
            Column("planner", String(225)),
            Column("line_index", String(225))  
    )

                  
meta.create_all(engine) 