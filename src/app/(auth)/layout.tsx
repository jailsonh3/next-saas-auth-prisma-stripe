import { auth } from '@/auth'
import Logo from '@/components/logo'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <section className="flex flex-col items-center justify-center py-40">
      <Link href={'/'}>
        <Logo />
      </Link>
      {children}
    </section>
  )
}
