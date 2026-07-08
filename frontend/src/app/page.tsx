import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface-muted">
      <div className="mx-auto min-h-screen w-full max-w-md px-4 py-10">
        <h1 className="text-center text-2xl font-bold text-foreground">
          BeforeYouGo
        </h1>

        <p className="mt-2 text-center text-sm text-muted">
          A last-minute checklist app before leaving home.
        </p>

        <div className="mt-8">
          <Link href="/tasksets">View tasksets</Link>
        </div>
      </div>
    </main>
  )
}
