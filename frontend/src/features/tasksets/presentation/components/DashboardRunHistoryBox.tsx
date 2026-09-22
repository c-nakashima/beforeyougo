'use client'

import type { TasksetRunSummary } from '@/features/tasksets/domain/type'
import { TextLink } from '@/app/shared/components/ui'
import { TasksetRunSummaryPreviewList } from '@/features/tasksets/presentation/components/'

/**
 * Dashboard Taskset Run History Box Component
 * Page layout for a dashboard page -- taskset section
 *
 */
type Props = {
  runs: TasksetRunSummary[]
}

export function DashboardRunHistoryBox({ runs }: Props) {
  return (
    <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline">
          <h1 className="text-xl font-bold mr-3">Your Run History</h1>
          <TextLink href="/history" text="View all run history" />
        </div>
      </div>
      <TasksetRunSummaryPreviewList runs={runs} />
    </div>
  )
}
