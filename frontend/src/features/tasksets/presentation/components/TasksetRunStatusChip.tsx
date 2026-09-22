import Icon from '@mdi/react'
import { mdiCheckCircle, mdiProgressClock, mdiCloseCircle } from '@mdi/js'
import type { TasksetRunStatus } from '@/features/tasksets/domain/type'

/**
 * Taskset Run Status Chip Component
 *
 */
type Props = {
  status: TasksetRunStatus
  className?: string
}

export function TasksetRunStatusChip({ status, className }: Props) {
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
  const config = statusConfig[status]

  return (
    <span
      className={`flex items-center rounded-xl text-white py-1 px-2 ${className ?? ''} ${config.className}`}
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
