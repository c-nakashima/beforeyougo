'use client'

import type { Taskset } from '@/features/tasksets/domain/type'
import { TextLink } from '@/app/shared/components/ui'
import {
  TasksetPreviewList,
  AddTasksetButton,
} from '@/features/tasksets/presentation/components/'

/**
 * Dashboard Taskset Box Component
 * Page layout for a dashboard page -- taskset section
 *
 */
type Props = {
  tasksets: Taskset[]
  className?: string
}

export function DashboardTasksetBox({ tasksets, className }: Props) {
  return (
    <div
      className={`mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-5 ${className ?? ''}`}
    >
      <div className="mb-6 flex items-center justify-between mb-3">
        <div className="flex items-baseline">
          <h1 className="text-xl font-bold mr-3">Your Tasksets</h1>
          <TextLink href="/tasksets" text="View all tasksets" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <AddTasksetButton />
        </div>
      </div>
      <TasksetPreviewList tasksets={tasksets} />
    </div>
  )
}
