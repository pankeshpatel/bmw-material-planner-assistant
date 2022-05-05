from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from config.db import conn
from config.utils import verify
from config.oauth2 import create_access_token


#from .. import  schemas, models, utils, oauth2

from schemas.user import UserLogin
from models.dbschema import dbUsers


authentication = APIRouter( 
          prefix = "/users",
          tags=["users"]
          )


@authentication.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm = Depends()):
# def login(user_credentials: UserLogin):
 
    # Get user details from database
    user = conn.execute(dbUsers.select().where(dbUsers.c.username == user_credentials.username)).first()

    if not user:
      raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not verify(user_credentials.password, user.password):
         raise HTTPException(
             status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")


    # This would generate a token
    # More detail - https://jwt.io/
    access_token = create_access_token(data={"username": user.username})

    return {"access_token": access_token, "token_type": "bearer"}
