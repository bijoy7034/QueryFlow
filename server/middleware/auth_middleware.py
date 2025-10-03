from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from jose import JWTError
from utils.token import verify_token as decode_token

ALLOWED_PATHS = ["/user/login", "/user/register", "/docs", "/openapi.json"]

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path in ALLOWED_PATHS:
            return await call_next(request)

        header = request.headers.get('Authorization')
        if header and header.startswith("Bearer "):
            token = header.split(" ")[1]
            try:
                payload = decode_token(token=token)
                request.state.user = payload
            except JWTError:
                return JSONResponse(status_code=401, content={"message": "Invalid token"})
        else:
            return JSONResponse(status_code=401, content={"message": "Authorization header missing or invalid"})
        
        return await call_next(request) 
    