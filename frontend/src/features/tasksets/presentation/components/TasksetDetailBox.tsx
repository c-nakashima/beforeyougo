import type { TasksetDetail as TasksetDetailType } from '@/features/tasksets/domain/type'

import { TasksetDetail } from '@/features/tasksets/presentation/components'

/**
 * Displays the content and layout for a taskset detail.
 * Provides the page layout for the taskset detail page.
 */
type Props = {
  tasksetDetail: TasksetDetailType
}

export function TasksetDetailBox({ tasksetDetail }: Props) {
  return (
    <div>
      <section className="mx-auto max-w-md p-6 md:max-w-2xl lg:max-w-4xl">
        <TasksetDetail tasksetDetail={tasksetDetail} />
      </section>
    </div>
  )
}
