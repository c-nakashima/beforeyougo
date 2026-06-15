from fastapi import APIRouter, HTTPException
from psycopg2 import Error

from app.db import get_connection

router = APIRouter(
  prefix="/tasksets",
  tags=["tasksets"],
)

@router.get("")
def get_tasksets():
  query = """
    SELECT
      tasksets.id,
      tasksets.title,
      tasksets.description,
      COUNT(tasks.id)::int AS task_count
    FROM tasksets
    LEFT JOIN tasks
      ON tasks.taskset_id = tasksets.id
    GROUP BY tasksets.id
    ORDER BY tasksets.created_at DESC;
  """

  try:
    # connect to the PostgreSQL database
    with get_connection() as connection:
      # create a cursor object using the connection
      with connection.cursor() as cursor:
        cursor.execute(query)
        rows = cursor.fetchall()
        # return the rows
        return rows
  except Error as e:
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve tasksets",
        ) from error