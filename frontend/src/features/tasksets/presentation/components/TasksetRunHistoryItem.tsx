import Link from 'next/link'
import type { TasksetRunHistory } from '@/features/tasksets/domain/type'
import { RunHistoryStatusChip } from '@/features/tasksets/presentation/components/'
/**
 * Taskset Run History Item Component
 * Single row of the list
 *
 */
type Props = {
  tasksetRunHistoryItem: TasksetRunHistory
  className?: string
}

export function TasksetRunHistoryItem({
  tasksetRunHistoryItem,
  className,
}: Props) {
  return (
    <Link
      href={`/tasksets/${tasksetRunHistoryItem.taskset_id}`}
      style={{ cursor: 'pointer' }}
      className={`flex justify-between items-center cursor-pointer bg-surface p-4 transition-colors hover:bg-surface-muted ${className ?? ''}`}
    >
      <div>
        <h2 className="font-bold">{tasksetRunHistoryItem.taskset_title}</h2>
        {tasksetRunHistoryItem.status && (
          <p className="text-sm text-secondary">
            {new Intl.DateTimeFormat('en-AU', {
              day: 'numeric',
              month: 'long',
              weekday: 'long',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Australia/Melbourne',
            }).format(new Date(tasksetRunHistoryItem.started_at))}{' '}
          </p>
        )}
      </div>
      <RunHistoryStatusChip tasksetRunStatus={tasksetRunHistoryItem.status} />
    </Link>
  )
}
