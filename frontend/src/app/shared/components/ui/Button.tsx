import Icon from '@mdi/react'

/**
 * Button Component
 * Base button component with icon and text.
 */
type Props = {
  IconPath?: string
  Text: string
  size?: 'small' | 'medium' | 'large'
  className?: string
  ariaLabel?: string
}

export function Button({ IconPath, Text, className, ariaLabel }: Props) {
  return (
    <button type="button" className={className} aria-label={ariaLabel}>
      {IconPath ? (
        <Icon
          path={IconPath}
          size="18px"
          color="currentColor"
          aria-hidden="true"
        />
      ) : null}
      {Text}
    </button>
  )
}
