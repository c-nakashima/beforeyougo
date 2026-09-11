export const dynamic = 'force-dynamic'

import { getTasksets } from '@/features/tasksets/application/getTasksets'

import { Header } from '@/app/shared/components/layout'
import { DashboardTasksetBox } from '@/features/tasksets/presentation/components'

/**
 * Dashboard Home Page
 *
 * Fetches the user's tasksets on the server and passes them to
 * `DashboardTasksetBox`, which handles the dashboard layout and interactions.
 */
export default async function HomePage() {
  const tasksets = await getTasksets()

  return (
    <main className="min-h-screen">
      <Header />
      <DashboardTasksetBox tasksets={tasksets} />
    </main>
  )
}
