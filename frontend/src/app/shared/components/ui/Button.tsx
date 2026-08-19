import Icon from '@mdi/react'

/**
 * Button Component
 * Base button component with icon and text.
 */
type Props = {
  text: string
  type?: 'button' | 'submit'
  iconPath?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
  ariaLabel?: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  text,
  type = 'button',
  iconPath,
  className,
  ariaLabel,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={`${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} transition duration-150 ease-out enabled:hover:brightness-90 enabled:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className ?? ''}`}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPath ? (
        <Icon
          path={iconPath}
          size="18px"
          color="currentColor"
          aria-hidden="true"
        />
      ) : null}
      {text}
    </button>
  )
}
