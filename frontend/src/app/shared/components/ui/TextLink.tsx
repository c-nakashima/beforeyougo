import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Text Link Component
 * Base Text Link component.
 */
type Props = {
  href: string
  text: string
  icon?: ReactNode
  className?: string
}

export function TextLink({ href, text, icon, className }: Props) {
  return (
    <Link
      href={href}
      className={`flex items-center w-fit text-sm text-primary underline hover:text-primary-hover ${className ?? ''}`}
    >
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{text}</span>
    </Link>
  )
}
