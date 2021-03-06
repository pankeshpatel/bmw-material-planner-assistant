from fastapi import APIRouter, status, HTTPException, Depends
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbPlanner
from config.oauth2 import get_current_user
import pandas as pd
import json

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


    
# async def get_material_planner_info(id:str, user_id: int = Depends(get_current_user), session: Session = Depends(get_db)):
    
@planner.get('/planner-id/{id}',  status_code = status.HTTP_200_OK)
async def get_material_planner_info(id:str):
    
    planner_id_key = "planners" + "/" + "planner-id" + "/" + id
    redis_reponse = my_redis.get(planner_id_key)
    
    if redis_reponse != None:
        print("Found the results in redis cache.......get_material_planner_info()")
        return redis_reponse
    
    else:
        print("I have not found the results in redis cache, computing now...get_material_planner_info()")   
    
        sql = """SELECT * from admin.Planner where id=%s"""
        df_planner = pd.DataFrame(pd.DataFrame(conn.execute(sql, id).fetchall()), columns=["id", "name", "email"])
        
        if len(df_planner.columns) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data item does not exist")
        
        # response = {
        #     "result" : json.loads(json.dumps(list(df_planner.T.to_dict().values())))
        # }
        
        my_redis.put(planner_id_key, json.dumps(list(df_planner.T.to_dict().values())), 950400)
        return json.dumps(list(df_planner.T.to_dict().values()))



# async def get_material_planner_info(name:str, user_id: int = Depends(get_current_user), session: Session = Depends(get_db)):

@planner.get('/planner-name/{name}',  status_code = status.HTTP_200_OK)
async def get_material_planner_info(name:str):
        
    data = conn.execute(dbPlanner.select().where(dbPlanner.c.name == name)).fetchall()
    
    if not data:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Items are not found")
    
    return data