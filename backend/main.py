from fastapi import FastAPI
from routes.index import *
from fastapi.middleware.cors import CORSMiddleware


# list here all the url on which the frontend is running
# Create a list of allowed origins (as strings).

# OR the other option is for frontend to add 
# "proxy" : "http://localhost:8000"
# this would indicate the url of backend
origins = [
   "*"
]


description = """
This is a MPA WebServer. 
It implements various APIs for the development of  MPA Dashboard and AI-based Forecasting Model 🚀

"""

app = FastAPI(title="Material Planner Assistant",
    description=description,
    version="0.0.1")



#You can also specify if your backend allows:

# Credentials (Authorization headers, Cookies, etc).
# Specific HTTP methods (POST, PUT) or all of them with the wildcard "*".
# Specific HTTP headers or all of them with the wildcard "*".


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
 )


app.include_router(planner)
app.include_router(material)
app.include_router(healthscore)
app.include_router(exception)
app.include_router(ranking)
app.include_router(authentication)
