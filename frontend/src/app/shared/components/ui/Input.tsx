/**
 * Base Input Component
 */
type Props = {
  type?: string
  value: string
  id?: string
  placeholder: string
  maxLength?: number
  disabled?: boolean
  className?: string
  onChange: (value: string) => void
}

export function Input({
  type,
  value,
  id,
  placeholder,
  maxLength,
  disabled,
  className,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      id={id}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className={`rounded-lg bg-white border border-slate-200 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none ${className ?? ''}`}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
