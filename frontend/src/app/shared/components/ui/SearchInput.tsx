import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

/**
 * Search Input Component
 */
type Props = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchInput({ value, onChange, className }: Props) {
  return (
    <div className={className}>
      <div className="relative">
        <Icon
          path={mdiMagnify}
          size="20px"
          color="var(--slate-500)"
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
        />

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Taskset"
          className="w-full rounded-lg bg-white border border border-slate-100 py-2 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none
    "
        />
      </div>
    </div>
  )
}
