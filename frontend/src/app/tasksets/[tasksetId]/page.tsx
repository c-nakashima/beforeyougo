import { getTasksetDetail } from '@/features/tasksets/application/getTasksetDetail'
import { Header } from '@/app/shared/components/layout'
import { TasksetDetailBox } from '@/features/tasksets/presentation/components'

/**
 * Taskset detail page.
 *
 * Fetches the selected taskset and its tasks on the server, then passes
 * the data to `TasksetDetailBox`, which handles the layout and interactions.
 *
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
    <main className="min-h-screen">
      <Header />
      <TasksetDetailBox tasksetDetail={tasksetDetail} />
    </main>
  )
}
