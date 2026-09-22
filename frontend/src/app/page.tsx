export const dynamic = 'force-dynamic'

import { getTasksets } from '@/features/tasksets/application/getTasksets'
import { getTasksetRunHistory } from '@/features/tasksets/application/getTasksetRunHistory'

import { Header } from '@/app/shared/components/layout'
import {
  DashboardTasksetBox,
  DashboardTasksetRunHistoryBox,
} from '@/features/tasksets/presentation/components'

/**
 * Dashboard Home Page
 *
 * Fetches the user's tasksets on the server and passes them to
 * `DashboardTasksetBox`, which handles the dashboard layout and interactions.
 */
export default async function HomePage() {
  const tasksets = await getTasksets()
  const tasksetRunHistory = await getTasksetRunHistory()

  return (
    <main className="min-h-screen mb-20">
      <Header />
      <DashboardTasksetBox tasksets={tasksets} className="mb-5" />
      <DashboardTasksetRunHistoryBox tasksetRunHistory={tasksetRunHistory} />
    </main>
  )
}
