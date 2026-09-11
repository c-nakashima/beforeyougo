'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { mdiDelete } from '@mdi/js'
import { deleteTaskset } from '@/features/tasksets/application/deleteTaskset'

import { Button, Snackbar } from '@/app/shared/components/ui'
import type { TasksetDetail } from '@/features/tasksets/domain/type'
import { TaskList } from './TaskList'

/**
 * Taskset Detail Component
 *
 * @property {TasksetDetail} tasksetDetail - taskset detail
 */
type Props = {
  tasksetDetail: TasksetDetail
}

export function TasksetDetail({ tasksetDetail }: Props) {
  const [deletingTasksetId, setDeletingTasksetId] = useState<string | null>(
    null,
  )
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const router = useRouter()

  // Function to delete a taskset
  async function handleDelete() {
    if (deletingTasksetId !== null) return

    // Double check if it is okay to delete the taskset
    const shouldDelete = window.confirm(
      `Delete "${tasksetDetail.title}"?\n\nAll tasks in this taskset will also be deleted. This action cannot be undone.`,
    )
    if (!shouldDelete) return

    try {
      setDeletingTasksetId(tasksetDetail.id)
      setError('')

      await deleteTaskset(tasksetDetail.id)

      // Only show the success message when the API succeeds
      setSuccessMessage('Taskset deleted successfully.')
      router.push('/tasksets')

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch {
      // If API failed restore the previous task list
      setError('Failed to delete taskset. Please try again.')
    } finally {
      setDeletingTasksetId(null)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3">
        <div className="mb-1 flex items-center">
          <h1 className="text-xl font-bold ml-1 mr-2">{tasksetDetail.title}</h1>
          <Button
            type="button"
            text=""
            iconPath={mdiDelete}
            onClick={() => void handleDelete()}
            disabled={deletingTasksetId !== null}
            ariaLabel={`Delete ${tasksetDetail.title}`}
            className="ml-1 rounded-sm text-icon-muted transition hover:text-error"
          />
        </div>
        {tasksetDetail.description && (
          <p className="text-sm text-secondary">{tasksetDetail.description}</p>
        )}
        {error && (
          <p className="mt-2 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <TaskList
        tasksetId={tasksetDetail.id}
        initialTasks={tasksetDetail.tasks}
      />

      {successMessage && <Snackbar message={successMessage} />}
    </div>
  )
}
