import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Navbar from './navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    return redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={session?.user?.name ?? ''} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
