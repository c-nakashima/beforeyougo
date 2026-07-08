import { fetchTasksets } from "@/features/tasksets/infrastructure/tasksetApi"
import type { Taskset } from "../domain/type"

export async function getTasksets(): Promise<Taskset[]> {
  return fetchTasksets()
}
