import { TasksetList } from '@/features/tasksets/presentation/components/'
import { getTasksets } from '@/features/tasksets/application/getTasksets'

export default async function TasksetsPage() {
  const tasksets = await getTasksets()

  return (
    <main>
      <h1>Your Tasksets</h1>
      <TasksetList tasksets={tasksets} />
    </main>
  )
}
