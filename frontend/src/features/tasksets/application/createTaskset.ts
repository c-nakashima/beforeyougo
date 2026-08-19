import { createTaskset as createTasksetApi } from '@/features/tasksets/infrastructure/tasksetApi'

import type {
  CreateTasksetInput,
  Taskset,
} from '@/features/tasksets/domain/type'

export async function createTaskset(
  input: CreateTasksetInput,
): Promise<Taskset> {
  return createTasksetApi(input)
}
