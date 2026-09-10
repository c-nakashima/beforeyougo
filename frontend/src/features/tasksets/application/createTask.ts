import { createTask as createTaskApi } from '@/features/tasksets/infrastructure/tasksetApi'
import type {
  CreateTaskInput,
  Task,
} from '@/features/tasksets/domain/type'

export async function createTask(
  tasksetId: string,
  input: CreateTaskInput,
): Promise<Task> {
  return createTaskApi(tasksetId, input)
}
