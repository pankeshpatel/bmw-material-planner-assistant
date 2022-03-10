from fastapi import APIRouter
from models.user import dbUser
from config.db import conn
from schemas.user import User
from datetime import datetime, date



planner = APIRouter()

@planner.get('/planners/', tags=["Material Planner"])
async def get_all_material_planner_info(plant : str = 'MC10'):
    
    # Write a logic here that list ALL identified planners with information
    # Planner ID
    # Planner Name
    # Planner Email 
    
    return {"planners": "This is a list of planners", 
            "plant": plant}

@planner.get('/planners/{planner_id}', tags=["Material Planner"])
async def get_material_planner_info(
                    planner_id:str, 
                    plant : str = 'MC10'):
    
    # Write a logic here that list a planner with the following information
    # Planner ID
    # Planner Name
    # Planner Email
    # Assigned  a list of Materials(Material IDs, Material Name) to the Material Planner
    
    return {"planner": planner_id, "plant": plant}


