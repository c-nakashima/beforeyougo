'use client'

import { useState } from 'react'
import type { TasksetRunSummary } from '@/features/tasksets/domain/type'
import { Header } from '@/app/shared/components/layout'
import { SearchInput } from '@/app/shared/components/ui'
import { TasksetRunSummaryList } from '@/features/tasksets/presentation/components/'

/**
 * Provides the dashboard layout and interactions for taskset run history.
 */
type Props = {
  runs: TasksetRunSummary[]
  className?: string
}

export function RunHistoryBox({ runs }: Props) {
  // Search input state (stores the text entered by the user)
  const [search, setSearch] = useState('')

  // Filter TasksetRunItems by title or description using the search keyword
  const filteredRuns = runs.filter((run) => {
    const keyword = search.trim().toLowerCase()

    return run.taskset_title.toLowerCase().includes(keyword)
  })

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold ml-1">All Taskset Run History</h1>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          className="w-full mb-4"
        />
        <TasksetRunSummaryList runs={filteredRuns} />
      </div>
    </div>
  )
}
