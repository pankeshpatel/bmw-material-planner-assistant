from fastapi import APIRouter
from models.user import dbUser
from config.db import conn
from schemas.user import User
from datetime import datetime, date



external = APIRouter()

@external.get('/external/weather', tags=["External"])
async def get_weather_info(plant:str = 'MC10'):
    return {"message": "Hello, World"}

@external.get('/external/traffic', tags=["External"])
async def get_traffic_info(plant:str = 'MC10'):
    return {"message": "Hello, World"}


























# # GET
# ## This is retrive all the users 
# @users.get('/')
# async def fetch_users():
#     return conn.execute(dbUser.select()).fetchall()

# # # GET
# # # This is to reterive a single user with id
# @users.get('/{id}')
# async def fetch_user(id: int):
#     return conn.execute(dbUser.select().where(dbUser.c.id == id)).first()


# # # POST
# # # This is to create a single user
# @users.post('/')
# async def create_user(user:User):
#     conn.execute(dbUser.insert().values(
#         name = user.name,
#         email = user.email,
#         password = user.password
#     ))
     
#     return conn.execute(dbUser.select()).fetchall()


# # # PUT
# # # This is to update a user with a id
# @users.put('/{id}')
# async def update_user(id:int, user: User):
#     conn.execute(dbUser.update().values(
#               name = user.name,
#               email = user.email,
#               password = user.password
#         ).where(dbUser.c.id == id)).fetchall()
    
#     return  conn.execute(dbUser.select()).fetchall()


# # # DELETE
# # # This is to delete a user with an id
# @users.delete('/{id}')
# async def delete_user(id: int):
#     conn.execute(dbUser.delete().where(dbUser.c.id == id))
#     return conn.execute(dbUser.select()).fetchall()

