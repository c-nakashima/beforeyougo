import { Taskset } from '../../domain/type'

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
    <ul>
      {tasksets.map((taskset) => (
        <li key={taskset.id}>
          <h2>{taskset.title}</h2>
          {taskset.description && <p>{taskset.description}</p>}
          <p>{taskset.task_count} tasks</p>
        </li>
      ))}
    </ul>
  )
}
