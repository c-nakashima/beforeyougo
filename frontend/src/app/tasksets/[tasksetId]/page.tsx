import Icon from '@mdi/react'
import { mdiChevronLeft } from '@mdi/js'

import { getTasksetDetail } from '@/features/tasksets/application/getTasksetDetail'
import { Header } from '@/app/shared/components/layout'
import { TextLink } from '@/app/shared/components/ui'
import { TasksetDetailBox } from '@/features/tasksets/presentation/components'

/**
 * Taskset detail page.
 *
 * Fetches the selected taskset and its tasks on the server, then passes
 * the data to `TasksetDetailBox`, which handles the layout and interactions.
 *
 */
type Props = {
  params: {
    tasksetId: string
  }
}

export default async function TasksetsPage({ params }: Props) {
  const { tasksetId } = await params
  const tasksetDetail = await getTasksetDetail(tasksetId)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        <TextLink
          href="/tasksets"
          text="Back to all tasksets"
          icon={<Icon path={mdiChevronLeft} size={0.75} aria-hidden />}
          className="mt-5 mb-3 ml-1"
        />
        <TasksetDetailBox tasksetDetail={tasksetDetail} />
      </div>
    </main>
  )
}
