from fastapi import APIRouter
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbHealthScore

healthscore = APIRouter()

# Write a logic that return a health score of a material
  # Material ID
  # Material Name
  # Health Score
  # Date
  # Other information

@healthscore.get('/healthscore/{planner_id}/{material_id}', tags=["Forecasting Model"])
async def get_material_healthscore(planner_id:str,
                                  material_id: str, 
                                  healthdate: str, 
                                  plant : str = 'MC10'):
     sql = """SELECT * FROM admin.HealthScore WHERE materialID = %s AND healthscoredate = %s"""     
     return conn.execute(sql, material_id, healthdate).fetchall()
   
    
    
    



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

