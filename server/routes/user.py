from fastapi import APIRouter
from models.user import User, Login
from services.user import login_user, register_service

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

@router.post("/register")
async def register_route(user: User):
    return await register_service(user)
    
@router.post("/login")
async def login_route(user: Login):
    return await login_user(user)