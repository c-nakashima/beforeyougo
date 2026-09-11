import type { Taskset } from '@/features/tasksets/domain/type'
import { TasksetCard } from '@/features/tasksets/presentation/components/'

/**
 * Taskset List Component for Dashboard
 * Show limited number of tasksets for preview in dashboard page
 * @property {Taskset[]} tasksets - taskset
 *
 */
type Props = {
  tasksets: Taskset[]
}

export function TasksetPreviewList({ tasksets }: Props) {
  // number of the displayed items
  const DISPLAY_LIMIT: number = 8

  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {tasksets.slice(0, DISPLAY_LIMIT).map((taskset) => (
        <li key={taskset.id}>
          <TasksetCard taskset={taskset} className="p-2" />
        </li>
      ))}
    </ul>
  )
}
