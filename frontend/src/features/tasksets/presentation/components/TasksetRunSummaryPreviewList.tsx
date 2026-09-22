import type { TasksetRunSummary } from '@/features/tasksets/domain/type'
import { TasksetRunSummaryItem } from '@/features/tasksets/presentation/components/'

/**
 * Taskset Run History List Component for Dashboard
 * Show limited number of taskset run history items for preview in dashboard page
 *
 */
type Props = {
  runs: TasksetRunSummary[]
}

export function TasksetRunSummaryPreviewList({ runs }: Props) {
  // number of the displayed items
  const DISPLAY_LIMIT: number = 4

  return (
    <ul className="border border-border rounded-xl overflow-auto divide-y divide-border">
      {runs.slice(0, DISPLAY_LIMIT).map((run) => (
        <li key={run.id}>
          <TasksetRunSummaryItem run={run} className="p-2" />
        </li>
      ))}
    </ul>
  )
}
