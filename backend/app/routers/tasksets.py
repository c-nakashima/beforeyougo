from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from psycopg2 import Error

from app.db import get_connection

class TasksetCreate(BaseModel):
  title: str = Field(
    min_length=1,
    max_length=100,
  )
  description:str | None = Field(
    default=None,
    max_length=250,
  )

class TaskCreate(BaseModel):
  title: str = Field(
    min_length=1,
    max_length=100,
  )
  sort_order:int | None = Field(
    default=None,
    ge=0,
  )

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
  except Error as error:
      raise HTTPException(
          status_code=500,
          detail="Failed to fetch tasksets",
      ) from error


@router.get("/{taskset_id}")
def get_taskset(taskset_id: UUID):
  taskset_query = """
    SELECT
      id,
      title,
      description,
      created_at,
      updated_at
    FROM tasksets
    WHERE id = %s;
  """
  tasks_query = """
    SELECT
      id,
      title,
      sort_order,
      created_at,
      updated_at
    FROM tasks
    WHERE taskset_id = %s
    ORDER BY sort_order ASC;
  """

  try:
    # connect to the PostgreSQL database
    with get_connection() as connection:
      # create a cursor object using the connection
      with connection.cursor() as cursor:
        cursor.execute(
          taskset_query,
          (str(taskset_id,),)
        )
        taskset = cursor.fetchone()

        if taskset is None:
          raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Taskset not found",
          )
        
        # retreive tasks belong to the taskset
        cursor.execute(
          tasks_query,
          (str(taskset_id,),)
        )
        tasks = cursor.fetchall()

    return {
      **taskset,
      "tasks": tasks,
    }

  except HTTPException:
    raise

  except Error as error:
      raise HTTPException(
          status_code=500,
          detail="Failed to retrieve taskset",
      ) from error


@router.post("", status_code=status.HTTP_201_CREATED)
def create_taskset(taskset: TasksetCreate):
  query = """
    INSERT INTO tasksets (
      title,
      description
    )
    VALUES (%s,%s)
    RETURNING
      id,
      title,
      description,
      created_at
      updated_at;
  """

  try:
    with get_connection() as connection:
      with connection.cursor() as cursor:
        cursor.execute(
          query,
          (taskset.title, taskset.description)
        )
        created_taskset = cursor.fetchone()
    return created_taskset
  except Error as error:
    raise HTTPException(
      status_code=500,
      detail="Failed to create taskset",
    ) from error


@router.post("/{taskset_id}/tasks", status_code=status.HTTP_201_CREATED)
def create_task(
  taskset_id: UUID,
  task: TaskCreate
):
  check_taskset_query = """
      SELECT id
      FROM tasksets
      WHERE id = %s;
  """

  insert_task_query = """
    INSERT INTO tasks (
      taskset_id,
      title,
      sort_order
    )
    VALUES (%s, %s, %s)
    RETURNING
      id,
      taskset_id,
      title,
      sort_order,
      created_at
      updated_at;
  """

  try:
    with get_connection() as connection:
      with connection.cursor() as cursor:
        # Check if taskset exists
        cursor.execute(
          check_taskset_query,
          (str(taskset_id),)
        )
        existing_taskset = cursor.fetchone()

        # If existing_taskset is None
        if existing_taskset is None:
          raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Taskset not found"
          )
        
        # If existing_taskset exists, add task
        cursor.execute(
          insert_task_query,
          (
            str(taskset_id),
            task.title,
            task.sort_order,
          )
        )
        created_task = cursor.fetchone()

    return created_task

  except Error as error:
    raise HTTPException(
      status_code=500,
      detail="Failed to create task",
    ) from error