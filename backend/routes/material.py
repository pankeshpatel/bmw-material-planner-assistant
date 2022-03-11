from fastapi import APIRouter
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbMaterialMaster




material = APIRouter()


# Write a logic here that returns a list materials, which are managed by selected material planners
    # Material ID
    # Material Name
    # Material Other ID
    # Safety Stock and other important parameters

@material.get('/materials/', tags=["Material"])
async def get_all_material_info(plant = 'MC10'):
    return conn.execute(dbMaterialMaster.select()).fetchall()
  
    

 # Write a logic here that return a material information
    # material ID
    # Material Name
    # Safety Stock
    # Other information 

@material.get('/materials/{material_id}', tags=["Material"])
async def get_material_info(material_id:str, plant : str = 'MC10'):
    
    return conn.execute(dbMaterialMaster.select().where(dbMaterialMaster.c.material == material_id)).first()
    
   
    
    
 


