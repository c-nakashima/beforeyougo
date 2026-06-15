import os
from pathlib import Path

import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor


ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in backend/.env")


def get_connection():
    return psycopg2.connect(
        DATABASE_URL,
        cursor_factory=RealDictCursor,
    )