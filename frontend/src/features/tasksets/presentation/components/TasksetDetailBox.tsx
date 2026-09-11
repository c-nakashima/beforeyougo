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
    <section>
      <TasksetDetail tasksetDetail={tasksetDetail} />
    </section>
  )
}
