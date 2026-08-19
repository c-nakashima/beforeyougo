from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import tasksets

app = FastAPI(
  title="BeforeYouGo API",
  version="0.1.0",
  description="API for the BeforeYouGo app",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(tasksets.router)

@app.get("/")
def root():
  return {
    "message": "BeforeYouGo API is running",
    }
