from utils.db import user_collection
from utils.hash import hash_password, verify_password
from utils.token import create_access_token

async def register_service(user):
    try:
        existing_user = await user_collection.find_one({"username": user.username})
        if existing_user:
            return {"error": "Username already exists."}
        user.password = hash_password(user.password)
        await user_collection.insert_one(user.dict())
        return {"message": "User registered successfully."}
    except Exception as e:
        return {"error": f"Error: {str(e)}"}
    
async def login_user(user):
    try:
        existing_user = await user_collection.find_one({"username": user.username})
        if not existing_user:
            return {"error": "Invalid username or password."}
        if not verify_password(user.password, existing_user['password']):
            return {"error": "Invalid username or password."}
        access_token = create_access_token({
            "email": existing_user['email'],
            "username": existing_user['username'],
            "is_admin": existing_user.get('is_admin')
        })
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        return {"error": f"Error: {str(e)}"}