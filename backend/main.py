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






app = FastAPI(title="Material Planner Assistant",
    description=description,
    version="0.0.1")

app.include_router(planner)
app.include_router(material)
app.include_router(healthscore)
app.include_router(exception)
app.include_router(credential)

