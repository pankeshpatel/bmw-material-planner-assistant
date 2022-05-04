from fastapi import APIRouter, Depends, HTTPException, status
from config.db import conn
from config.auth import AuthHandler
from schemas.user import User
from models.dbschema import users

credential = APIRouter(
    prefix = "/users",
    tags=["users"]
)
auth_handler = AuthHandler()


# This API will register material planner and overwrite FastAPI default status - status.HTTP_200_OK
@credential.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: User):
    all_users = conn.execute(users.select()).fetchall()
    if any(x['username'] == user.username for x in all_users):
        raise HTTPException(400, 'user name is taken')

    hashed_password = auth_handler.get_password_hash(user.password)

    conn.execute(users.insert().values(   
        username=user.username,
        password=hashed_password
    ))

    return conn.execute(users.select().where(users.c.username == user.username)).fetchall()


@credential.post("/login", status_code=status.HTTP_200_OK)
async def login(user : User):
    all_users = conn.execute(users.select()).fetchall()
    
    print("Password", user.password)
    
    userNameStr = None
    userPasswordStr = None
    
    for x in all_users:
        if x.username == user.username:
            userNameStr = x.username
            userPasswordStr = x.password
            break
    
    if(userNameStr is None):
        raise HTTPException(401, "Not user")
    elif (not auth_handler.verify_password(user.password, userPasswordStr)):
        raise HTTPException(401, "Invalid username or password")
    else:
        token = auth_handler.encode_token(user.username)

        return {"token": token}
    
    
    




# @credential.get("/protected")
# async def protected(email=Depends(auth_handler.auth_wrapper)):
#     # return conn.execute(users.select().where(users.c.email == email)).fetchall()
#     return {"email": email}