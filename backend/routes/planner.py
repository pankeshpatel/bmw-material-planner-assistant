from fastapi import APIRouter, status, HTTPException
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbPlanner


planner = APIRouter()

# Write a logic here that list ALL identified planners with information
    # Planner ID
    # Planner Name
    # Planner Email 
    
@planner.get('/planners/', tags=["Material Planner"], status_code = status.HTTP_200_OK)
async def get_all_material_planner_info(plant : str = 'MC10'):
    #cursor = dbPlanner.cursor()
    sql = "SELECT * FROM admin.Planner"
    data = conn.execute(sql).fetchall()
    
    if len(data.columns) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data item does not exist")
    
    return conn.execute(sql).fetchall()

  
# Write a logic here that list a planner with the following information
    # Planner ID
    # Planner Name
    # Planner Email
    # Assigned  a list of Materials(Material IDs, Material Name) to the Material Planner
    
@planner.get('/planners/{planner_id}', tags=["Material Planner"], status_code = status.HTTP_200_OK)
async def get_material_planner_info(
                    planner_id:str, 
                    plant : str = 'MC10'):
    
    data = conn.execute(dbPlanner.select().where(dbPlanner.c.mrpcnt == planner_id)).first()
    
    if len(data.columns) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data item does not exist")
    
    
    return conn.execute(dbPlanner.select().where(dbPlanner.c.mrpcnt == planner_id)).first()
