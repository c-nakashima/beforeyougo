import { apiClient } from '@/shared/lib/apiClient'
import type { Taskset, TasksetDetail } from '../domain/type'

export async function fetchTasksets(): Promise<Taskset[]> {
  return apiClient<Taskset[]>('/tasksets')
}

export async function fetchTasksetDetail(
  tasksetId: string,
): Promise<TasksetDetail> {
  return apiClient<TasksetDetail>(`/tasksets/${tasksetId}`)
}
