from fastapi import FastAPI
from app.routers import tasksets

app = FastAPI(
  title="BeforeYouGo API",
  version="0.1.0",
  description="API for the BeforeYouGo app",
)

app.include_router(tasksets.router)

@app.get("/")
def root():
  return {
    "message": "BeforeYouGo API is running",
    }