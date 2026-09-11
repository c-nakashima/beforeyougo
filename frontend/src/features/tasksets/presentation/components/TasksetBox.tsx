'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Taskset } from '@/features/tasksets/domain/type'
import { Header } from '@/app/shared/components/layout'
import { Snackbar } from '@/app/shared/components/ui'
import { SearchInput } from '@/app/shared/components/ui'
import {
  TasksetList,
  AddTasksetButton,
} from '@/features/tasksets/presentation/components/'

/**
 * Provides the dashboard layout and interactions for tasksets.
 */
type Props = {
  tasksets: Taskset[]
  className?: string
}

export function TasksetBox({ tasksets }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  // when redirected from taskset deletion
  const isDeleted = searchParams.get('deleted') === 'true'

  useEffect(() => {
    if (!isDeleted) return

    const timeoutId = window.setTimeout(() => {
      // delete query parameter from url to prevent showing snackbar again
      router.replace('/tasksets', { scroll: false })
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [isDeleted, router])

  // Search input state (stores the text entered by the user)
  const [search, setSearch] = useState('')
  // Keeps the list in sync immediately after a taskset is created
  const [displayedTasksets, setDisplayedTasksets] = useState(tasksets)

  // Filter tasksets by title or description using the search keyword
  const filteredTasksets = displayedTasksets.filter((taskset) => {
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
            <AddTasksetButton
              onCreated={(createdTaskset) =>
                setDisplayedTasksets((currentTasksets) => [
                  createdTaskset,
                  ...currentTasksets,
                ])
              }
            />
          </div>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          className="w-full mb-4"
        />
        <TasksetList tasksets={filteredTasksets} />
      </div>
      {isDeleted && <Snackbar message="Taskset deleted successfully." />}
    </div>
  )
}
