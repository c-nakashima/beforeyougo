import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import tasksets

allowed_origins = [
  origin.strip()
  for origin in os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
  ).split(",")
  if origin.strip()
]

app = FastAPI(
  title="BeforeYouGo API",
  version="0.1.0",
  description="API for the BeforeYouGo app",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=allowed_origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(
  tasksets.router,
  prefix="/api/backend",
)

@app.get("/")
def root():
  return {
    "message": "BeforeYouGo API is running",
    }
