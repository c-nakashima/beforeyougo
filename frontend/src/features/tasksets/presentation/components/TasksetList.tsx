import type { Taskset } from '@/features/tasksets/domain/type'
import { TasksetItem } from '@/features/tasksets/presentation/components/'

/**
 * Taskset List Component
 *
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
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {tasksets.map((taskset) => (
        <li key={taskset.id}>
          <TasksetItem taskset={taskset} />
        </li>
      ))}
    </ul>
  )
}
