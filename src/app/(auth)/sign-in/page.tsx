import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { SignInForm } from './signIn-form'

export default async function LoginPage() {
  return (
    <>
      <Card className="mt-12 w-full max-w-sm rounded-2xl">
        <CardHeader>
          <h2 className="font-bold text-xl">Boas Vindas</h2>
          <CardDescription>Faça seu login com email e senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
      <p className="mt-3 text-muted-foreground text-sm">
        Não possui cadastro?{' '}
        <Link className="text-gray-800 hover:underline" href="/register">
          Registre-se
        </Link>
        .
      </p>
    </>
  )
}
