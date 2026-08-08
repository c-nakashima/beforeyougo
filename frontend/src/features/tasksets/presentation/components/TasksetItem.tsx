import Link from 'next/link'
import type { Taskset } from '@/features/tasksets/domain/type'

/**
 * Taskset List Item Component
 *
 * @property {string} taskset - taskset
 */
type Props = {
  taskset: Taskset
}

export function TasksetItem({ taskset }: Props) {
  return (
    <Link
      href={`/tasksets/${taskset.id}`}
      className="block rounded-xl border border-border rounded-md bg-white p-4"
    >
      <h2 className="font-bold">{taskset.title}</h2>
      {taskset.description && (
        <p className="text-sm text-secondary">{taskset.description}</p>
      )}
    </Link>
  )
}
