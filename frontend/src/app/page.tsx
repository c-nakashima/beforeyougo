export const dynamic = 'force-dynamic'

import { getTasksets } from '@/features/tasksets/application/getTasksets'
import { getTasksetRunSummaries } from '@/features/tasksets/application/getTasksetRunSummaries'

import { Header } from '@/app/shared/components/layout'
import {
  DashboardTasksetBox,
  DashboardRunHistoryBox,
} from '@/features/tasksets/presentation/components'

/**
 * Dashboard Home Page
 *
 * Fetches the user's tasksets on the server and passes them to
 * `DashboardTasksetBox`, which handles the dashboard layout and interactions.
 */
export default async function HomePage() {
  const [tasksets, runs] = await Promise.all([
    getTasksets(),
    getTasksetRunSummaries(),
  ])

  return (
    <main className="min-h-screen mb-20">
      <Header />
      <DashboardTasksetBox tasksets={tasksets} className="mb-5" />
      <DashboardRunHistoryBox runs={runs} />
    </main>
  )
}
