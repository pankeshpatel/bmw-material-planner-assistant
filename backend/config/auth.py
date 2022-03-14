import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"

class AuthHandler():
    security = HTTPBearer()
    pwd_context = CryptContext(schemes=["bcrypt"])
    #secret = "SECRET"
    

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, password, hashed_password):
        return self.pwd_context.verify(password, hashed_password)
    
    

    # This function is responsible for creating token.
    def encode_token(self, email):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS),
            'iat': datetime.utcnow(),
            'sub': email
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm=ALGORITHM
        )

    # This function is responsible for verifying token.
    def decode_token(self, token):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid token')

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)