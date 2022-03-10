from fastapi import APIRouter
from models.user import dbUser, dbExceptionMessage
from config.db import conn
from datetime import datetime, date


exception = APIRouter()

# Write a logic that returns a list of  exception ID  and exception message
@exception.get('/exceptions/', tags=["Exception"])
async def get_all_exception_info(plant:str = 'MC10'):
    return conn.execute(dbExceptionMessage.select()).fetchall()


@exception.get('/exceptions/{material_id}', tags=["Exception"])
async def get_material_exception_info(material_id: str, 
                                      start_date : date = date.today(),
                                      end_date : date = date.today(),
                                      plant:str = 'MC10'):
    
    # Write a logic that returns a list of exceptions in the specific time range
    # material id
    # material name
    # start date
    # end date
    # exceptions per date
    
    return {
        "material ID" : material_id,
        "start date" : start_date,
        "end date" : end_date,
        "plant" : plant
    }
    
    




























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

