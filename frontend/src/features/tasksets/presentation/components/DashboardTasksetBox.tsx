'use client'

import Link from 'next/link'
import type { Taskset } from '@/features/tasksets/domain/type'
import { mdiPlus } from '@mdi/js'

import { Button } from '@/app/shared/components/ui'
import { TasksetPreviewList } from '@/features/tasksets/presentation/components/'

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
        <h1 className="text-xl font-bold ml-1">Your Tasksets</h1>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            iconPath={mdiPlus}
            text="Add"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
          />
        </div>
      </div>
      <TasksetPreviewList tasksets={tasksets} />
      <Link
        href="/tasksets"
        className="block w-fit ml-auto text-sm text-primary underline hover:text-primary-hover mt-3 mr-1"
      >
        View All tasksets
      </Link>
    </div>
  )
}
