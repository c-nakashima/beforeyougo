import { apiClient } from '@/shared/lib/apiClient'
import type {
  Taskset,
  TasksetDetail,
  CreateTasksetInput,
  CreateTaskInput,
  Task,
} from '@/features/tasksets/domain/type'

export async function fetchTasksets(): Promise<Taskset[]> {
  return apiClient<Taskset[]>('/tasksets')
}

export async function fetchTasksetDetail(
  tasksetId: string,
): Promise<TasksetDetail> {
  return apiClient<TasksetDetail>(`/tasksets/${tasksetId}`)
}

export async function createTaskset(
  input: CreateTasksetInput,
): Promise<Taskset> {
  return apiClient<Taskset>('/tasksets', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function createTask(
  tasksetId: string,
  input: CreateTaskInput,
): Promise<Task> {
  return apiClient<Task>(`/tasksets/${tasksetId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
