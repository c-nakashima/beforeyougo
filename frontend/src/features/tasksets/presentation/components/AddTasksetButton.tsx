'use client'

import { useState } from 'react'

import { mdiPlus } from '@mdi/js'
import { Button } from '@/app/shared/components/ui'
import { AddTasksetModal } from './AddTasksetModal'

/**
 * Add Button Component
 * Open modal to add a taskset.
 */
type Props = {
  className?: string
  ariaLabel?: string
}

export function AddTasksetButton({ className, ariaLabel }: Props) {
  // Controls whether the Add Taskset modal is open
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        iconPath={mdiPlus}
        text="Add"
        ariaLabel={ariaLabel}
        onClick={() => setIsOpen(true)}
        className={
          className ??
          'inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white'
        }
      />

      {isOpen && <AddTasksetModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
