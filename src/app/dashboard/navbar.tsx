'use client'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOutAction } from '../(auth)/(sign-out)/sign-out-action'

export default function Navbar({ userName }: { userName: string }) {
  const pathname = usePathname()
  // console.info(pathname)

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn(pathname === '/dashboard' ? 'underline' : '')}>
              Livro do Mês
            </Button>
          </Link>
          <Link href="/dashboard/signature" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn(pathname === '/dashboard/signature' ? 'underline' : '')}>
              Minha Assinatura
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="text-gray-700 hover:text-gray-900">
                <User size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="font-light text-xs uppercase">{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button type="submit" onClick={signOutAction}>
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
