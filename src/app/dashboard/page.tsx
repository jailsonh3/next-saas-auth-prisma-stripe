import { auth } from '@/auth'
import BannerWarning from '@/components/banner-warning'
import PricingCard from '@/components/pricing-card'
import { buttonVariants } from '@/components/ui/button'
import { fetchSubscriptionByEmail } from '@/lib/stripe'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import bookImg from './book.png'

export default async function MonthlyBook() {
  const session = await auth()
  const userEmail = session?.user?.email as string

  const subscribe = await fetchSubscriptionByEmail(userEmail)

  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Livro do Mês</h1>
      {subscribe ? (
        <>
          <Image src={bookImg} alt="Livro do mês" />
          <Link
            className={cn(
              'mt-10 flex items-center justify-center gap-4',
              buttonVariants(),
            )}
            href="/livro.pdf"
            target="_blank"
          >
            <Download className="h-4 w-4" /> Download do Pdf
          </Link>
        </>
      ) : (
        <>
          <BannerWarning text="Para acessar o livro do mês, você precisa de uma assinatura ativa, Quer tal assinar agora?" />
          <PricingCard />
        </>
      )}
    </>
  )
}
