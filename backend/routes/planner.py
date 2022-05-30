from fastapi import APIRouter, status, HTTPException, Depends
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbPlanner
from config.oauth2 import get_current_user

from sqlalchemy.orm import Session
from config.db import get_db

from config.redisdb import redis_db
my_redis = redis_db()



planner = APIRouter(
    prefix = "/planners",
    tags=["planners"]
)

# Write a logic here that list ALL identified planners with information
    # Planner ID
    # Planner Name
    # Planner Email 
    
@planner.get('/',  status_code = status.HTTP_200_OK)
async def get_all_material_planner_info(user_id: int = Depends(get_current_user), session: Session = Depends(get_db)):

    
    
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
    

    
@planner.get('/planner-id/{id}',  status_code = status.HTTP_200_OK)
async def get_material_planner_info(id:str, user_id: int = Depends(get_current_user), session: Session = Depends(get_db)):

    data = conn.execute(dbPlanner.select().where(dbPlanner.c.id == id)).first()

    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Items are not found")
    
    return data


@planner.get('/planner-name/{name}',  status_code = status.HTTP_200_OK)
async def get_material_planner_info(name:str, user_id: int = Depends(get_current_user), session: Session = Depends(get_db)):
                    #user_id: int = Depends(get_current_user)):
        
    data = conn.execute(dbPlanner.select().where(dbPlanner.c.name == name)).fetchall()
    
    if not data:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Items are not found")
    
    return data