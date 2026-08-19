import type { TasksetDetail as TasksetDetailType } from '@/features/tasksets/domain/type'

import { Header } from '@/app/shared/components/layout'
import { TasksetDetail } from '@/features/tasksets/presentation/components'

/**
 * Page layout for a taskset detail.
 */
type Props = {
  tasksetDetail: TasksetDetailType
}

export function TasksetDetailBox({ tasksetDetail }: Props) {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md p-6 md:max-w-2xl lg:max-w-4xl">
        <TasksetDetail tasksetDetail={tasksetDetail} />
      </div>
    </div>
  )
}
