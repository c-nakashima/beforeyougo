import type { TasksetDetail } from '@/features/tasksets/domain/type'

/**
 * Taskset Detail Component
 *
 * @property {TasksetDetail} tasksetDetail - taskset detail
 */
type Props = {
  tasksetDetail: TasksetDetail
}

export function TasksetDetail({ tasksetDetail }: Props) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3">
        <h1 className="text-xl font-bold ml-1 mb-1">{tasksetDetail.title}</h1>
        {tasksetDetail.description && (
          <p className="text-sm text-secondary">{tasksetDetail.description}</p>
        )}
      </div>
      <ul>
        {tasksetDetail.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}
