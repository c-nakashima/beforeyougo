import { Header } from './Header'

/**
 * Shared loading shell component
 * shown while server pages fetch data.
 */
export function PageLoading() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-md p-6 md:max-w-2xl lg:max-w-4xl">
        <div className="animate-pulse space-y-4" aria-hidden="true">
          <div className="h-7 w-40 rounded-md bg-surface-muted" />
          <div className="h-10 w-full rounded-md bg-surface-muted" />
          <div className="space-y-3 pt-2">
            <div className="h-16 rounded-md bg-surface-muted" />
            <div className="h-16 rounded-md bg-surface-muted" />
            <div className="h-16 rounded-md bg-surface-muted" />
          </div>
        </div>
        <p className="sr-only">Loading...</p>
      </div>
    </main>
  )
}
