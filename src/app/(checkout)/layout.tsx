import Logo from '@/components/logo'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center py-40">
      <Link href={'/'}>
        <Logo />
      </Link>
      {children}
    </section>
  )
}
