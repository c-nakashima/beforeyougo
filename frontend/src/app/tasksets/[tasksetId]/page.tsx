import { getTasksetDetail } from '@/features/tasksets/application/getTasksetDetail'
import { TasksetDetailBox } from '@/features/tasksets/presentation/components'

/**
 * Taskset Detail Page
 * Display a taskset's list and let user to view/run/add tasks
 *  @property {string} tasksetId - taskset id
 */
type Props = {
  params: {
    tasksetId: string
  }
}

export default async function TasksetsPage({ params }: Props) {
  const { tasksetId } = await params
  const tasksetDetail = await getTasksetDetail(tasksetId)

  return (
    <main>
      <TasksetDetailBox tasksetDetail={tasksetDetail} />
    </main>
  )
}
