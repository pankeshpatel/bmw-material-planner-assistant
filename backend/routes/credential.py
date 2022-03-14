from fastapi import APIRouter, Depends, HTTPException
from config.db import conn
from config.auth import AuthHandler
from schemas.user import User
from models.dbschema import users

credential = APIRouter()
auth_handler = AuthHandler()


# This API will register material planner
@credential.post("/register", status_code=201, tags=["Authentication"])
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


@credential.post("/login", tags=["Authentication"])
async def login(username: str, password: str):
    all_users = conn.execute(users.select()).fetchall()

    user = None
    for x in all_users:
        if x.username == username:
            user = x
            break

    if(user is None):
        raise HTTPException(401, "Not user")
    elif (not auth_handler.verify_password(password, user.password)):
        raise HTTPException(401, "Invalid username or password")
    else:
        token = auth_handler.encode_token(user.username)

        return {"token": token}


# @credential.get("/protected")
# async def protected(email=Depends(auth_handler.auth_wrapper)):
#     # return conn.execute(users.select().where(users.c.email == email)).fetchall()
#     return {"email": email}