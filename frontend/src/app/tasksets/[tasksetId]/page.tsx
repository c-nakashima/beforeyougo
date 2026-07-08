import { getTasksetDetail } from '@/features/tasksets/application/getTasksetDetail'
import { TasksetDetail } from '@/features/tasksets/presentation/components/TasksetDetail'

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
      <h1>Your Tasksets</h1>
      <TasksetDetail tasksetDetail={tasksetDetail} />
    </main>
  )
}
