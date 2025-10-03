from motor.motor_asyncio import AsyncIOMotorClient
from config import config


try:
    mongo_client = AsyncIOMotorClient(config.MONGO_URI)
    db = mongo_client[config.DB_NAME]
    user_collection = db['users']
except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")