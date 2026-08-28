import logging
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from routes import base_router, user_router
from utils import AppError

app = FastAPI()
logger = logging.getLogger(__name__)


app.include_router(base_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1/user")


@app.exception_handler(AppError)
async def app_error_handler(request, exc: AppError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"code": exc.code, "message": exc.message},
    )
