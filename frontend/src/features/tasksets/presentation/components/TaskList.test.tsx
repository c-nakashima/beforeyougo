import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Task } from '@/features/tasksets/domain/type'
import { createTask } from '@/features/tasksets/application/createTask'
import { deleteTask } from '@/features/tasksets/application/deleteTask'

import { TaskList } from './TaskList'

// Mock API data
vi.mock('@/features/tasksets/application/createTask', () => ({
  createTask: vi.fn(),
}))

vi.mock('@/features/tasksets/application/deleteTask', () => ({
  deleteTask: vi.fn(),
}))

const createTaskMock = vi.mocked(createTask)
const deleteTaskMock = vi.mocked(deleteTask)

const initialTask: Task = {
  id: 'task-1',
  title: 'Bring wallet',
  sort_order: 0,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

const createdTask: Task = {
  id: 'task-2',
  title: 'Bring keys',
  sort_order: 1,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('TaskList', () => {
  it('optimistically display a new task before resolving API connection (create a task)', async () => {
    const user = userEvent.setup()

    // Variable to store promise
    // keep the resolve function so we can control when the fake API finishes.
    let resolveCreate!: (task: Task) => void

    // create promise
    createTaskMock.mockReturnValue(
      new Promise<Task>((resolve) => {
        // Save resolve for later --  can resolve the Promise later in the test
        resolveCreate = resolve
      }),
    )

    render(<TaskList tasksetId="taskset-1" initialTasks={[initialTask]} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Add task' }),
      'Bring keys',
    )
    await user.click(screen.getByRole('button', { name: 'Add' }))

    // Display a new task before resolving API connection
    expect(screen.getByText('Bring keys')).toBeInTheDocument()

    expect(createTaskMock).toHaveBeenCalledWith('taskset-1', {
      title: 'Bring keys',
      sort_order: 1,
    })

    // Now finish the fake API call and resolve promise
    resolveCreate(createdTask)

    expect(
      await screen.findByText('Task created successfully.'),
    ).toBeInTheDocument()
  })

  it('Revert Optmistic UI when task creation fails', async () => {
    const user = userEvent.setup()

    createTaskMock.mockRejectedValue(new Error('API request failed'))

    render(<TaskList tasksetId="taskset-1" initialTasks={[initialTask]} />)

    const input = screen.getByRole('textbox', {
      name: 'Add task',
    })

    await user.type(input, 'Bring keys')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Failed to add task. Please try again.',
    )

    // Optmistically added task is not displayed
    expect(screen.queryByText('Bring keys')).not.toBeInTheDocument()
    // The existing tasks are displayed
    expect(screen.getByText('Bring wallet')).toBeInTheDocument()
  })

  it('Revert Optmistic UI when task deletion fails', async () => {
    const user = userEvent.setup()

    deleteTaskMock.mockRejectedValue(new Error('API request failed'))

    render(<TaskList tasksetId="taskset-1" initialTasks={[initialTask]} />)

    await user.click(
      screen.getByRole('button', {
        name: 'Delete Bring wallet',
      }),
    )

    expect(deleteTaskMock).toHaveBeenCalledWith('taskset-1', 'task-1')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Failed to delete task. Please try again.',
    )

    // After API delete fails、the task is displayed in the list
    expect(screen.getByText('Bring wallet')).toBeInTheDocument()
  })
})
