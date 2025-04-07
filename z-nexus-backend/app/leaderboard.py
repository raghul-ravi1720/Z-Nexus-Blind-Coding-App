from app.redis_connection import redis_client

LEADERBOARD_KEY = "leaderboard"

def add_score(user_id: str, score: int):
    redis_client.zadd(LEADERBOARD_KEY, {user_id: score})

def get_top_users(limit: int = 10):
    return redis_client.zrevrange(LEADERBOARD_KEY, 0, limit - 1, withscores=True)

def update_score(user_id: str, score: int):
    redis_client.zincrby(LEADERBOARD_KEY, score, user_id)
