from redis import Redis
import json
import sys


def redis_db():
    return Cachedis()


class Cachedis(object):
    
    def __init__(self, host="localhost", port=6379, db=0):
        self.__redis = Redis(host, port, db)
        
    def put(self, key, value, expiration_time=3600):
        self.__redis.set(key, value, expiration_time)
        
    def get(self, key):        
        return self.__redis.get(key)
        
    def remove(self, key):       
        return self.__redis.lpop(key)
        
    def clear(self):
        self.__redis.flushdb()

