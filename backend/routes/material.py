from fastapi import APIRouter
from models.user import dbUser
from config.db import conn
from schemas.user import User
from datetime import datetime, date



material = APIRouter()




@material.get('/materials/', tags=["Material"])
async def get_all_material_info(plant = 'MC10'):
    
    # Write a logic here that returns a list materials, which are managed by selected material planners
    # Material ID
    # Material Name
    # Material Other ID
    # Safety Stock and other important parameters
    
    
    return { 
            "materials": "This is a list of Materials at Plant MC10", 
            "plant" : plant 
           }


@material.get('/materials/{material_id}', tags=["Material"])
async def get_material_info(material_id:str, plant : str = 'MC10'):
    
    # Write a logic here that return a material information
    # material ID
    # Material Name
    # Safety Stock
    # Other information 
    
    
    return {
            "material ID": material_id,
            "plant": plant
        }


