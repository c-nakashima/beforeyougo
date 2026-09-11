import { deleteTaskset as deleteTasksetApi } from '@/features/tasksets/infrastructure/tasksetApi'

import type { DeleteTasksetResult } from '@/features/tasksets/domain/type'

export async function deleteTaskset(id: string): Promise<DeleteTasksetResult> {
  return deleteTasksetApi(id)
}
