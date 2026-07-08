import { fetchTasksetDetail } from '@/features/tasksets/infrastructure/tasksetApi'

export async function getTasksetDetail(tasksetId: string) {
  return fetchTasksetDetail(tasksetId)
}
