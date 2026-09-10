/**
 * Snackbar Component
 * Base Snackbar component.
 */
type Props = {
  message: string
}

export function Snackbar({ message }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg"
    >
      {message}
    </div>
  )
}
