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
    <section>
      <h1>{tasksetDetail.title}</h1>
      <p>{tasksetDetail.description}</p>
      <ul>
        {tasksetDetail.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </section>
  )
}
