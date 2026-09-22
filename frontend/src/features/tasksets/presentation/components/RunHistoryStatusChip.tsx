import Icon from '@mdi/react'
import { mdiCheckCircle, mdiProgressClock, mdiCloseCircle } from '@mdi/js'
import type { TasksetRunStatus } from '@/features/tasksets/domain/type'

/**
 * Taskset Card Component
 *
 * @property {string} taskset - taskset
 */
type Props = {
  tasksetRunStatus: TasksetRunStatus
  className?: string
}

export function RunHistoryStatusChip({ tasksetRunStatus, className }: Props) {
  const statusConfig = {
    done: {
      label: 'Done',
      icon: mdiCheckCircle,
      className: 'bg-success',
    },
    wip: {
      label: 'In Progress',
      icon: mdiProgressClock,
      className: 'bg-warning',
    },
    cancelled: {
      label: 'Cancelled',
      icon: mdiCloseCircle,
      className: 'bg-error',
    },
  }
  const config = statusConfig[tasksetRunStatus]

  return (
    <span
      className={`flex items-center rounded-xl bg-success text-white py-1 px-2 ${className ?? ''} ${config.className}`}
    >
      <Icon
        path={config.icon}
        size={0.7}
        aria-hidden
        className={`mr-1 text-white`}
      />
      <span className={`font-medium text-white`}>{config.label}</span>
    </span>
  )
}
