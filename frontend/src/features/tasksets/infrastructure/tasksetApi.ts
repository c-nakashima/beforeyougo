import { apiClient } from "@/shared/lib/apiClient";
import type { Taskset } from "../domain/type";

export async function fetchTasksets(): Promise<Taskset[]> {
  return apiClient<Taskset[]>("/tasksets");
}