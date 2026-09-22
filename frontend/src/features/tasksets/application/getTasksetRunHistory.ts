import { fetchTasksetRunHistory } from '@/features/tasksets/infrastructure/tasksetApi'
import type { TasksetRunHistory } from '@/features/tasksets/domain/type'

export async function getTasksetRunHistory(): Promise<TasksetRunHistory[]> {
  return fetchTasksetRunHistory()
}
