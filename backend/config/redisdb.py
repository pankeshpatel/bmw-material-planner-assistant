import redis

redis_client = redis.Redis(host="localhost", port=6379)

# Key - Value
#redis_client.set('foo', 'bar')