'use client'

import type { TasksetRunHistory } from '@/features/tasksets/domain/type'
import { TextLink } from '@/app/shared/components/ui'
import {
  TasksetRunHistoryPreviewList,
  AddTasksetButton,
} from '@/features/tasksets/presentation/components/'

/**
 * Dashboard Taskset Run History Box Component
 * Page layout for a dashboard page -- taskset section
 *
 */
type Props = {
  tasksetRunHistory: TasksetRunHistory[]
}

export function DashboardTasksetRunHistoryBox({ tasksetRunHistory }: Props) {
  return (
    <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-5">
      <div className="mb-6 flex items-center justify-between mb-3">
        <div className="flex items-baseline">
          <h1 className="text-xl font-bold mr-3">Your Run History</h1>
          <TextLink href="/tasksetRunHistory" text="View all run history" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <AddTasksetButton />
        </div>
      </div>
      <TasksetRunHistoryPreviewList tasksetRunHistory={tasksetRunHistory} />
    </div>
  )
}
