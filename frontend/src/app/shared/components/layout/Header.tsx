import Link from 'next/link'
import Image from 'next/image'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'

/**
 * Header Component
 *
 */

export function Header() {
  return (
    <header className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl grid h-full grid-cols-[1fr_auto_1fr] items-center py-3 px-5">
      <div aria-hidden="true" />
      <h1 className="items-center">
        <Link
          href="/"
          className="logo justify-self-center"
          aria-label="Before You Go"
        >
          <Image
            src="/images/logo.svg"
            alt="Before You Go"
            width={160}
            height={32}
            priority
          />
        </Link>
      </h1>
      <button
        type="button"
        aria-label="Open menu"
        className="flex h-10 w-10 justify-self-end items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
      >
        <Icon
          path={mdiMenu}
          size="24px"
          color="var(--color-primary)"
          aria-hidden="true"
        />
      </button>
    </header>
  )
}
