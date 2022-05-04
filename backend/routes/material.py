from fastapi import APIRouter, status, HTTPException
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbMaterialMaster
import pandas as pd
import json





material = APIRouter()


# Write a logic here that returns a list materials, which are managed by selected material planners
    # Material ID
    # Material Name
    # Material Other ID
    # Safety Stock and other important parameters
    
# API Call
# http://localhost:8000/materials/114

# We write "status_code" to change a default behabiour of FastAPI.
# by default, FastAPI returns "200_OK", when everything is okay. This may be good got GET operation.
# however, it may not be good for POST operation to create a certain thing, for the POST - create, one need to
# send "201_Created" , instead of 200_HTTP_OK. 
# status_code = status.HTTP_201_CREATE would change a default behaviour.

@material.get('/materials/{planner_id}', tags=["Material"], status_code = status.HTTP_200_OK)
async def get_all_material_info(planner_id: str):
    
    sql = """SELECT DISTINCT material, material_9, material_7, mat_description, 
    mat_description_eng, safety_stock FROM admin.MaterialMaster WHERE planner = %s"""
    
    df_material_master = pd.DataFrame(conn.execute(sql, planner_id).fetchall(), columns=["material", "material_9", "material_7", "mat_description", "mat_description_eng", "safety_stock"])
    
    
    response = {
        "planner" : planner_id,
        "result": json.loads(json.dumps(list(df_material_master.T.to_dict().values())))     
    }
    
    return response

 # Write a logic here that return a material information
    # material ID
    # Material Name
    # Safety Stock
    # Other information 

# API Call
# http://localhost:8000/materials/114/7430935-05

# We write "status_code" to change a default behabiour of FastAPI.
# by default, FastAPI returns "200_OK", when everything is okay. This may be good got GET operation.
# however, it may not be good for POST operation to create a certain thing, for the POST - create, one need to
# send "201_Created" , instead of 200_HTTP_OK. 
# status_code = status.HTTP_201_CREATE would change a default behaviour.

@material.get('/materials/{planner_id}/{material_id}', tags=["Material"], 
              status_code = status.HTTP_200_OK)
async def get_material_info(planner_id : str, 
                            material_id:str):
    
    sql = """SELECT DISTINCT material, material_9, material_7, mat_description, mat_description_eng, safety_stock FROM admin.MaterialMaster WHERE planner = %s AND material = %s"""
    df_material_planner_master = pd.DataFrame(conn.execute(sql, planner_id, material_id).fetchall(), columns=["material", "material_9", "material_7", "mat_description", "mat_description_eng", "safety_stock"])
    
    
    response = {
        "planner" : planner_id,
        "material" : material_id,
        "result": json.loads(json.dumps(list(df_material_planner_master.T.to_dict().values())))     
    }
    
    return response



