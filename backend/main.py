from fastapi import FastAPI
from models.dbschema import  dbExceptionMessage, dbMaterialMaster
from routes.planner import planner
from routes.material import material
from routes.healthscore import healthscore
from routes.exception import exception
from routes.credential import credential

description = """
This is a MPA WebServer. 
It implements various APIs for the development of  MPA Dashboard and AI-based Forecasting Model 🚀

"""

tags_metadata = [
    {
        "name" : "Material Planner",
        "description" : "Operations with Material Planner."
    },
    {
        "name" : "Material",
        "description" : "Operations with Material, planned by material planner."
    },
     
    {
        "name" : "Forecasting Model",
        "description" : "This is to derive a health score of a material. A health score is a number between 0 - 100."
    },
      
    {
        "name" : "Exception Manager",
        "description" : "Operations with Exceptions related to the material."
    },
    
     
               
    {
        "name" : "Authentication",
        "description" : "Operations with sign-in users, login"
    }
     
]




app = FastAPI(title="Material Planner Assistant",
    description=description,
    version="0.0.1", openapi_tags=tags_metadata)

app.include_router(planner)
app.include_router(material)
app.include_router(healthscore)
app.include_router(exception)
app.include_router(credential)

