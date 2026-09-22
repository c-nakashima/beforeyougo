import { fetchTasksetRunSummaries } from '@/features/tasksets/infrastructure/tasksetApi'
import type { TasksetRunSummary } from '@/features/tasksets/domain/type'

export async function getTasksetRunSummaries(): Promise<TasksetRunSummary[]> {
  return fetchTasksetRunSummaries()
}
