from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user
from middleware.auth_middleware import AuthMiddleware

app = FastAPI()

app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)