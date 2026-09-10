'use client'
import { type SyntheticEvent, useState } from 'react'
import { mdiDelete } from '@mdi/js'
import type { Task } from '@/features/tasksets/domain/type'
import { createTask } from '@/features/tasksets/application/createTask'
import { deleteTask } from '@/features/tasksets/application/deleteTask'

import { Button, Input } from '@/app/shared/components/ui'

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

  // Function to submit a task
  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle || isSubmitting) return

    try {
      setIsSubmitting(true)
      setError('')

      // new task
      const newTask = await createTask(tasksetId, {
        title: trimmedTitle,
        sort_order: tasks.length,
      })
      setTasks((currentTasks) => [...currentTasks, newTask])

      // reset title
      setTitle('')
    } catch {
      setError('Failed to add task. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(taskId: string) {
    if (deletingTaskId !== null) return

    try {
      setDeletingTaskId(taskId)
      setError('')

      await deleteTask(tasksetId, taskId)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      )
    } catch {
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
                className="ml-1 rounded-sm text-muted transition hover:text-red-600"
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
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
