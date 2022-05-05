from fastapi import FastAPI
from routes.index import *


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
app.include_router(authentication)

