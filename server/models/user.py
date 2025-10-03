from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    email: str
    is_admin: bool = False

class Login(BaseModel):
    username: str
    password: str