import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default async function CheckoutReturnPage() {
  return (
    <Card className="mt-10 max-w-lg text-center">
      <CardContent>
        <CardHeader>
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <CardTitle>Assinatura Confirmada</CardTitle>
          <CardDescription>
            Obrigado por se juntar a nossa comunidade LivroSaaS
          </CardDescription>
        </CardHeader>
        <div className="text-gray-700 text-sm">
          <p>
            Sua assinatura foi processada com sucesso e sua conta está ativa.
          </p>
          <p>Agora é só aproveitar nosso conteúdo</p>
        </div>

        <Link href="/dashboard" className={cn(buttonVariants(), 'mt-12')}>
          Ir para Dashboard
        </Link>
      </CardContent>
    </Card>
  )
}
