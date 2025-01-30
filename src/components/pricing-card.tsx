import { auth } from '@/auth'
import { fetchSubscriptionByEmail } from '@/lib/stripe'
import { Check } from 'lucide-react'
import { PaymentButton } from './payment-button'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

export default async function PricingCard() {
  const session = await auth()
  const userEmail = session?.user?.email as string

  const subscription = await fetchSubscriptionByEmail(userEmail)

  return (
    <Card className="mt-10 w-[350px] text-left md:mt-20">
      <CardHeader>
        <CardTitle>Plano Pro Premium VIP</CardTitle>
        <CardDescription>
          Tudo que você precisa para seus estudos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-4 mb-8 font-bold text-4xl">
          R$29
          <span className="font-normal text-lg text-muted-foreground">
            /mês
          </span>{' '}
        </p>
        <ul>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Acesso a 1 ebook por mês
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Curadoria especial
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Acesso ilimitado
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Cancele quando quiser
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {!subscription && <PaymentButton>Assine Agora</PaymentButton>}
      </CardFooter>
    </Card>
  )
}
