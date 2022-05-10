from pydantic import BaseSettings


class Settings(BaseSettings):
   DB_USER : str
   DB_PASSWORD : str 
   DB_HOST : str 
   DB_PORT : str
   DATABASE : str 
   SECRET_KEY : str 
   ALGORITHM : str 
   ACCESS_TOKEN_EXPIRE_DAYS : int 
   
   class Config:
      env_file = ".env"
   

settings = Settings()  
