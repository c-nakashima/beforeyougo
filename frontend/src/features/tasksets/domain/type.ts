// Task Item
export type Task = {
  id: string
  title: string
  sort_order: number
  created_at: string
  updated_at: string
}

// Taskset Item
export type Taskset = {
  id: string
  title: string
  description: string | null
  task_count: number
}

// Taskset Detail
export type TasksetDetail = {
  id: string
  title: string
  description: string | null
  created_at: string
  updated_at: string
  tasks: Task[]
}

// Input to create a taskset
export type CreateTasksetInput = {
  title: string
  description?: string
}

// Input to create a task
export type CreateTaskInput = {
  title: string
  sort_order: number
}

//Delete taskset's response
export type DeleteTasksetResult = {
  id: string
}

//Delete task's response
export type DeleteTaskResult = {
  id: string
}
