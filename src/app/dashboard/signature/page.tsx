import { auth } from '@/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchSubscriptionByEmail } from '@/lib/stripe'
import { CreditCard, XCircle } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import cancelSubscriptionAction from './cancelSubscriptionAction'

export default async function MySubscription() {
  const session = await auth()
  const userEmail = session?.user?.email as string

  const subscription = await fetchSubscriptionByEmail(userEmail)

  if (!subscription) {
    return redirect('/dashboard')
  }

  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Minha Assinatura</h1>
      <div className="flex gap-10">
        <PlanCard subscription={subscription} />
        <ActionCard subscription={subscription} />
      </div>
    </>
  )
}

function PlanCard({ subscription }: { subscription: any }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Detalhes da Assinatura</CardTitle>
        <CardDescription>Informações sobre seu plano atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Plano:</span>
            <span>{subscription?.plan.nickname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600">
              {subscription?.status === 'active'
                ? 'Ativo'
                : subscription?.status === 'canceled'
                  ? 'Cancelado'
                  : subscription?.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Próxima cobrança:</span>
            <span>
              {new Date(
                subscription?.current_period_end * 1000,
              ).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span>
              {(subscription?.plan.amount / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ciclo:</span>
            <span>
              {subscription?.plan.interval === 'month'
                ? 'Mensal'
                : subscription?.plan.interval}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ActionCard({ subscription }: { subscription: any }) {
  return (
    <Card className="h-full w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Gerencie sua assinatura</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Link
            target="_blank"
            href={process.env.STRIPE_CUSTOMER_PORTAL_URL ?? ''}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
            Atualizar método de pagamento
          </Link>
          <Form action={cancelSubscriptionAction}>
            <input
              type="hidden"
              name="subscriptionId"
              value={subscription?.id}
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Cancelar assinatura
            </button>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}
