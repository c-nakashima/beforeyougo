import Link from 'next/link'
import type { Taskset } from '@/features/tasksets/domain/type'

/**
 * Taskset Card Base Component
 *
 * @property {string} taskset - taskset
 */
type Props = {
  taskset: Taskset
  className?: string
}

export function BaseTasksetCard({ taskset, className }: Props) {
  return (
    <Link
      href={`/tasksets/${taskset.id}`}
      style={{ cursor: 'pointer' }}
      className={`block cursor-pointer rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-muted ${className ?? ''}`}
    >
      <h2 className="font-bold">{taskset.title}</h2>
      {taskset.description && (
        <p className="text-sm text-secondary">{taskset.description}</p>
      )}
    </Link>
  )
}
