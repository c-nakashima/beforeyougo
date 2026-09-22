import type { TasksetRunSummary } from '@/features/tasksets/domain/type'
import { TasksetRunSummaryItem } from './TasksetRunSummaryItem'

/**
 * Taskset Run List Component for taskset run history page
 * Show all taskset run items
 */
type Props = {
  runs: TasksetRunSummary[]
}

export function TasksetRunSummaryList({ runs }: Props) {
  if (runs.length === 0) {
    return <p>No taskset running history yet.</p>
  }

  return (
    <ul className="border border-border rounded-xl overflow-auto divide-y divide-border">
      {runs.map((run) => (
        <li key={run.id}>
          <TasksetRunSummaryItem run={run} className="p-2" />
        </li>
      ))}
    </ul>
  )
}
