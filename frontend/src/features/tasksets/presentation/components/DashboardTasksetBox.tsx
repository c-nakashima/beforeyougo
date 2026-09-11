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
 * @property {Taslset[]} tasksets - taskset
 */
type Props = {
  tasksets: Taskset[]
}

export function DashboardTasksetBox({ tasksets }: Props) {
  return (
    <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-5">
      <div className="mb-6 flex items-center justify-between mb-3">
        <div className="flex items-baseline">
          <h1 className="text-xl font-bold mr-3">Your Tasksets</h1>
          <TextLink href="/tasksets" text="View All tasksets" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* <Button
            iconPath={mdiPlus}
            text="Add"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
          /> */}
          <AddTasksetButton />
        </div>
      </div>
      <TasksetPreviewList tasksets={tasksets} />
    </div>
  )
}
