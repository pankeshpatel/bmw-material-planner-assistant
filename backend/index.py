from fastapi import FastAPI
from models.user import dbUser
from models.user import dbExceptionMessage
from routes.supplychain import supplychain
from routes.planner import planner
from routes.material import material
from routes.healthscore import healthscore
from routes.external import external
from routes.exception import exception

description = """
This is a MPA WebServer. 
It implements various APIs for the development of  MPA Dashboard and AI-based Forecasting Model 🚀

#### Material Planner 

* **get_all_material_planner_info** (_not implemented_).
* **get_material_planner_info** (_not implemented_).

####  Material 

* **get_all_material_info** (_not implemented_).
* **get_material_info** (_not implemented_).

####  Forecasting Model

* **get_material_healthscore** (_not implemented_).



####  Exception

* **get_all_exception_info** (implemented).
* **get_material_exception_info** (_not implemented_).

#### Material Transaction

* **get_material_transaction_info** (_not implemented_).

#### Supply Chain

* **get_eta_delivery** (_not implemented_).
* **get_arrival_probability** (_not implemented_).


#### External

* **get_weather_info** (_not implemented_).
* **get_traffic_info** (_not implemented_).

"""

tags_metadata = [
    {
        "name" : "Material Planner",
        "description" : "Operations with Material Planner at MC10."
    },
    {
        "name" : "Material",
        "description" : "Operations with Material, planned by material planner at MC10."
    },
     
    {
        "name" : "Forecasting Model",
        "description" : "This is to derive a health score of a material. A health score is a number between 0 - 100."
    },
      
    {
        "name" : "Exception",
        "description" : "Operations with Exceptions related to the material at plant MC10."
    },
     {
        "name" : "Material Transaction",
        "description" : "MD04 transaction with Material."
    },
     
    {
        "name" : "Supply Chain",
        "description" : "Operations with supply chain of a material."
    },
      
    {
        "name" : "External",
        "description" : "External APIs of Weather and Traffic to be used for supply chain of material."
    }
    
]


app = FastAPI(title="Material Planner Assistant",
    description=description,
    version="0.0.1", openapi_tags=tags_metadata)

app.include_router(planner)
app.include_router(material)
app.include_router(healthscore)
app.include_router(exception)
app.include_router(supplychain)
app.include_router(external)