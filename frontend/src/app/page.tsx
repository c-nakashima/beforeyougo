import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>BeforeYouGo</h1>
      <p>A last-minute checklist app before leaving home.</p>

      <Link href="/tasksets">View tasksets</Link>
    </main>
  )
}
