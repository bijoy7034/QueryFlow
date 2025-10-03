from config import config
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(int(config.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp" : expire})
    return jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)


def verify_token(token: str):
    try:
        payload = jwt.decode(token,config.SECRET_KEY, algorithms=config.ALGORITHM)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except JWTError:
        return{"detail" : "Invalid token"}