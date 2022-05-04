from fastapi import APIRouter, status, HTTPException
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbPlanner


planner = APIRouter(
    prefix = "/planners"
)

# Write a logic here that list ALL identified planners with information
    # Planner ID
    # Planner Name
    # Planner Email 
    
# We write "status_code" to change a default behabiour of FastAPI.
# by default, FastAPI returns "200_OK", when everything is okay. This may be good got GET operation.
# however, it may not be good for POST operation to create a certain thing, for the POST - create, one need to
# send "201_Created" , instead of 200_HTTP_OK. 
# status_code = status.HTTP_201_CREATE would change a default behaviour.    
    
@planner.get('/', tags=["Material Planner"], status_code = status.HTTP_200_OK)
async def get_all_material_planner_info():
    #cursor = dbPlanner.cursor()
    
    sql = "SELECT * FROM admin.Planner"
    data = conn.execute(sql).fetchall()
    
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Items are not found")
    
    
    return conn.execute(sql).fetchall()


# Write a logic here that list a planner with the following information
    # Planner ID
    # Planner Name
    # Planner Email
    # Assigned  a list of Materials(Material IDs, Material Name) to the Material Planner
    
# We write "status_code" to change a default behabiour of FastAPI.
# by default, FastAPI returns "200_OK", when everything is okay. This may be good got GET operation.
# however, it may not be good for POST operation to create a certain thing, for the POST - create, one need to
# send "201_Created" , instead of 200_HTTP_OK. 
# status_code = status.HTTP_201_CREATE would change a default behaviour.
    
@planner.get('/{planner_id}', tags=["Material Planner"], status_code = status.HTTP_200_OK)
async def get_material_planner_info(planner_id:str):
    
    data = conn.execute(dbPlanner.select().where(dbPlanner.c.planner == planner_id)).first()
    
    if not data:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Items are not found")
    
    return data
