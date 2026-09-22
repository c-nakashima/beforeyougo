import Link from 'next/link'
import type { TasksetRunSummary } from '@/features/tasksets/domain/type'
import { TasksetRunStatusChip } from './TasksetRunStatusChip'

/**
 * Taskset Run History Item Component
 * Single row of the list
 *
 */
type Props = {
  run: TasksetRunSummary
  className?: string
}

export function TasksetRunSummaryItem({ run, className }: Props) {
  return (
    <Link
      href={`/tasksets/${run.taskset_id}`}
      style={{ cursor: 'pointer' }}
      className={`flex justify-between items-center cursor-pointer bg-surface p-4 transition-colors hover:bg-surface-muted ${className ?? ''}`}
    >
      <div>
        <h2 className="font-bold">{run.taskset_title}</h2>
        <p className="text-sm text-secondary">
          {new Intl.DateTimeFormat('en-AU', {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Australia/Melbourne',
          }).format(new Date(run.started_at))}{' '}
        </p>
      </div>
      <TasksetRunStatusChip status={run.status} />
    </Link>
  )
}
