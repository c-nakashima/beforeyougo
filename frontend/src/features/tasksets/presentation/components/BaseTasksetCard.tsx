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
      className={`block rounded-xl border border-border bg-surface transition-colors hover:bg-surface-muted p-4 ${className}`}
    >
      <h2 className="font-bold">{taskset.title}</h2>
      {taskset.description && (
        <p className="text-sm text-secondary">{taskset.description}</p>
      )}
    </Link>
  )
}
