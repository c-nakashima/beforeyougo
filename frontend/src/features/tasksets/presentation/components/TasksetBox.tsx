'use client'

import { useState } from 'react'
import type { Taskset } from '@/features/tasksets/domain/type'
import { mdiPlus } from '@mdi/js'
import { Header } from '@/app/shared/components/layout'
import { SearchInput } from '@/app/shared/components/ui'
import {
  TasksetList,
  AddTasksetButton,
} from '@/features/tasksets/presentation/components/'

/**
 * Taskset Box Component
 * Recieve tasksets data and display with components
 *  @property {string} tasksets - taskset list
 */
type Props = {
  tasksets: Taskset[]
  className?: string
}

export function TasksetBox({ tasksets }: Props) {
  // Search input state (stores the text entered by the user)
  const [search, setSearch] = useState('')

  // Filter tasksets by title or description using the search keyword
  const filteredTasksets = tasksets.filter((taskset) => {
    const keyword = search.trim().toLowerCase()

    return (
      taskset.title.toLowerCase().includes(keyword) ||
      taskset.description?.toLowerCase().includes(keyword)
    )
  })

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold ml-1">All Tasksets</h1>
          <div className="flex shrink-0 items-center gap-2">
            <AddTasksetButton />
          </div>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          className="w-full mb-4"
        />
        <TasksetList tasksets={filteredTasksets} />
      </div>
    </div>
  )
}
