import { getTasksetRunSummaries } from '@/features/tasksets/application/getTasksetRunSummaries'
import { RunHistoryBox } from '@/features/tasksets/presentation/components/'

/**
 * History List Page
 * Display taskset run history list and let user to view/continue running taskset
 *
 */
export default async function HistoryPage() {
  const runs = await getTasksetRunSummaries()

  return (
    <main>
      <RunHistoryBox runs={runs} />
    </main>
  )
}
