import type { TasksetRunHistory } from '@/features/tasksets/domain/type'
import { TasksetRunHistoryItem } from '@/features/tasksets/presentation/components/'

/**
 * Taskset Run History List Component for Dashboard
 * Show limited number of taskset run history items for preview in dashboard page
 *
 */
type Props = {
  tasksetRunHistory: TasksetRunHistory[]
}

export function TasksetRunHistoryPreviewList({ tasksetRunHistory }: Props) {
  // number of the displayed items
  const DISPLAY_LIMIT: number = 4

  return (
    <ul className="gap-0 border border-border rounded-xl overflow-auto divide-y divide-border">
      {tasksetRunHistory.slice(0, DISPLAY_LIMIT).map((item) => (
        <li key={item.id} className="">
          <TasksetRunHistoryItem tasksetRunHistoryItem={item} className="p-2" />
        </li>
      ))}
    </ul>
  )
}
