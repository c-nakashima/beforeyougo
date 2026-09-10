'use client'
import { type SyntheticEvent, useState } from 'react'
import { mdiDelete } from '@mdi/js'
import type { Task } from '@/features/tasksets/domain/type'
import { createTask } from '@/features/tasksets/application/createTask'
import { deleteTask } from '@/features/tasksets/application/deleteTask'

import { Button, Input, Snackbar } from '@/app/shared/components/ui'

/**
 * TaskList Component
 * Shows task list on the detail page
 */
type Props = {
  tasksetId: string
  initialTasks: Task[]
}

export function TaskList({ tasksetId, initialTasks }: Props) {
  const [tasks, setTasks] = useState(initialTasks)
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  // Function to submit a task
  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle || isSubmitting) return

    const previousTasks = tasks
    const optimisticId = `temp-${Date.now()}`
    const optimisticTask: Task = {
      id: optimisticId,
      title: trimmedTitle,
      sort_order: tasks.length,
      created_at: '',
      updated_at: '',
    }

    // Optimistic UI: add with a temp id first, then swap in the server task on success
    setTasks((currentTasks) => [...currentTasks, optimisticTask])
    setTitle('')

    try {
      setIsSubmitting(true)
      setError('')

      const newTask = await createTask(tasksetId, {
        title: trimmedTitle,
        sort_order: previousTasks.length,
      })

      // Replace the temp task in place so the list does not duplicate entries
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === optimisticId ? newTask : task)),
      )
      // Only show the success message when the API succeeds
      setSuccessMessage('Task created successfully.')

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch {
      // Roll back to the list before the optimistic add
      setTasks(previousTasks)
      setTitle(trimmedTitle)
      setError('Failed to add task. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to delete a task
  async function handleDelete(taskId: string) {
    if (deletingTaskId !== null) return

    // task list before deletion
    const previousTasks = tasks

    // Optimistic UI : delete from the screen immediately before API call resolved
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )

    try {
      setDeletingTaskId(taskId)
      setError('')

      await deleteTask(tasksetId, taskId)

      // Only show the success message when the API succeeds
      setSuccessMessage('Task deleted successfully.')

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch {
      // If API failed restore the previous task list
      setTasks(previousTasks)
      setError('Failed to delete task. Please try again.')
    } finally {
      setDeletingTaskId(null)
    }
  }

  return (
    <div>
      {tasks.length > 0 && (
        <ul className="my-5 space-y-3" aria-label="Tasks">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center text-base">
              <span aria-hidden="true" className="mr-2">
                -
              </span>
              <span className="mr-1">{task.title}</span>
              <Button
                type="button"
                text=""
                iconPath={mdiDelete}
                onClick={() => void handleDelete(task.id)}
                disabled={deletingTaskId !== null}
                ariaLabel={`Delete ${task.title}`}
                className="ml-1 rounded-sm text-muted transition hover:text-error"
              />
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex items-stretch gap-3">
        <label htmlFor="new-task-title" className="sr-only">
          Add task
        </label>
        <Input
          id="new-task-title"
          type="text"
          value={title}
          placeholder={tasks.length === 0 ? 'Initial Task' : 'Add task'}
          maxLength={100}
          disabled={isSubmitting}
          className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none disabled:opacity-50"
          onChange={setTitle}
        />
        <Button
          text={isSubmitting ? 'Adding...' : 'Add'}
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="shrink-0 rounded-md bg-surface-muted px-4 py-2 font-medium text-primary hover:bg-border"
        />
      </form>

      {error && (
        <p className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      )}

      {successMessage && <Snackbar message={successMessage} />}
    </div>
  )
}
