import { deleteTask as deleteTaskApi } from '@/features/tasksets/infrastructure/tasksetApi'

import type { DeleteTaskResult } from '@/features/tasksets/domain/type'

export async function deleteTask(
  tasksetId: string,
  taskId: string,
): Promise<DeleteTaskResult> {
  return deleteTaskApi(tasksetId, taskId)
}
