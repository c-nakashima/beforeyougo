import Link from 'next/link'
import { mdiPlay, mdiPlus } from '@mdi/js'

import { Header } from '@/app/shared/components/layout'
import { Button } from '@/app/shared/components/ui'

import { DashboardTasksetList } from '@/features/tasksets/presentation/components/'
import { getTasksets } from '@/features/tasksets/application/getTasksets'

export default async function HomePage() {
  const tasksets = await getTasksets()
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl p-5">
        <div className="mb-6 flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold ml-1">Your Tasksets</h1>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              IconPath={mdiPlus}
              Text="Add"
              className="inline-flex items-center gap-1.5 rounded-md bg-surface-muted px-4 py-2 text-sm font-medium text-primary"
            />
            <Button
              IconPath={mdiPlay}
              Text="Run"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
            />
          </div>
        </div>
        <DashboardTasksetList tasksets={tasksets} />
        <Link
          href="/tasksets"
          className="block w-fit ml-auto text-sm text-primary underline hover:text-primary-hover mt-3 mr-1"
        >
          View tasksets
        </Link>
      </div>
    </main>
  )
}
