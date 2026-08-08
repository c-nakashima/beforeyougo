import type { Taskset } from '@/features/tasksets/domain/type'
import { BaseTasksetCard } from '@/features/tasksets/presentation/components/'

/**
 * Dashboard Taskset List Component
 *
 * @property {Taslset[]} tasksets - taskset
 */
type Props = {
  tasksets: Taskset[]
}

export function DashboardTasksetList({ tasksets }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {tasksets.map((taskset) => (
        <li key={taskset.id}>
          <BaseTasksetCard taskset={taskset} className="p-2" />
        </li>
      ))}
    </ul>
  )
}
