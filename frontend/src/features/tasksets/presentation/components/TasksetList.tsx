import type { Taskset } from '@/features/tasksets/domain/type'
import { TasksetCard } from '@/features/tasksets/presentation/components/'

/**
 * Taskset List Component for taskset page
 * Show all tasksets
 * @property {string} tasksets - taskset list
 */
type Props = {
  tasksets: Taskset[]
}

export function TasksetList({ tasksets }: Props) {
  if (tasksets.length === 0) {
    return <p>No tasksets yet.</p>
  }

  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
      {tasksets.map((taskset) => (
        <li key={taskset.id}>
          <TasksetCard taskset={taskset} className="p-2" />
        </li>
      ))}
    </ul>
  )
}
