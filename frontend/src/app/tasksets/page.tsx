import { TasksetBox } from '@/features/tasksets/presentation/components/'
import { getTasksets } from '@/features/tasksets/application/getTasksets'

/**
 * Taskset List Page
 * Display taskset List and let user to view/run/add taskset
 *  @property {string} tasksets - taskset list
 */
export default async function TasksetsPage() {
  const tasksets = await getTasksets()

  return (
    <main>
      <TasksetBox tasksets={tasksets} />
    </main>
  )
}
