import os
from pathlib import Path

import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor

# Get dotenv file path
ENV_Path = Path(__file__).resolve().parents[1] / ".env"
# Load dotenv file and store in os as a environment variable
load_dotenv(ENV_Path)
DATABASE_URL = os.getenv("DATABASE_URL")
# If DATABASE_URL is not set, raise an error
if not DATABASE_URL:
  raise RuntimeError("DATABASE_URL is not set in backend/.env")

def get_connection():
  return psycopg2.connect(
    DATABASE_URL,
    cursor_factory=RealDictCursor,
  )