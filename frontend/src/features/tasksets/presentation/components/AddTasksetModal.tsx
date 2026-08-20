'use client'

import { type MouseEvent, type SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { createTaskset } from '@/features/tasksets/application/createTaskset'
import type { Taskset } from '@/features/tasksets/domain/type'

import { Button } from '@/app/shared/components/ui'

type Props = {
  onClose: () => void
  onCreated: (taskset: Taskset) => void
}

export function AddTasksetModal({ onClose, onCreated }: Props) {
  // Stores the taskset title entered by the user
  const [title, setTitle] = useState('')

  // Stores the optional taskset description entered by the user
  const [description, setDescription] = useState('')

  // Tracks whether the taskset is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Stores an error message if validation or API request fails
  const [error, setError] = useState('')

  const router = useRouter()

  function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      setError('Please enter a taskset name.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const createdTaskset = await createTaskset({
        title: trimmedTitle,
        description: trimmedDescription || undefined,
      })

      onCreated(createdTaskset)
      onClose()
      router.refresh()
    } catch {
      setError('Failed to create taskset.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-taskset-title"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm rounded-xl bg-surface p-5 shadow-lg">
        <h2 id="add-taskset-title" className="text-lg font-bold">
          Add Taskset
        </h2>

        <p className="mt-1 text-sm text-secondary">
          New taskset for tasks before you go.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="taskset-title" className="text-sm font-medium">
            Taskset Name
          </label>

          <input
            id="taskset-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Work Day Tasks"
            autoFocus
            className="
              mt-2 w-full rounded-md
              border border-border
              bg-surface px-3 py-2
              text-sm
              focus:border-primary
              focus:outline-none
            "
          />

          <label
            htmlFor="taskset-description"
            className="mt-4 block text-sm font-medium"
          >
            Description <span className="text-secondary">(optional)</span>
          </label>
          <textarea
            id="taskset-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Things to check before going to work"
            maxLength={250}
            rows={3}
            className="mt-2 w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <Button
              text="Cancel"
              disabled={isSubmitting}
              className="rounded-md border border-border px-4 py-2 text-sm"
              onClick={onClose}
            />
            <Button
              text={isSubmitting ? 'Adding...' : 'Add'}
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-md bg-primary
                px-4 py-2 text-sm
                text-primary-foreground
                hover:bg-primary-hover
                disabled:opacity-50
              "
            />
          </div>
        </form>
      </div>
    </div>
  )
}
