import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import RegisterUserForm from './register-user-form'

export default function RegisterPage() {
  return (
    <>
      <Card className="mt-12 w-full max-w-sm rounded-2xl">
        <CardHeader>
          <h2 className="font-bold text-xl">Cadastre-se</h2>
          <CardDescription>Faça seu cadastro gratuitamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterUserForm />
        </CardContent>
      </Card>
      <p className="mt-3 text-muted-foreground text-sm">
        Já possui cadastro?{' '}
        <Link className="text-gray-800 hover:underline" href="/sign-in">
          Faça o login
        </Link>
        .
      </p>
    </>
  )
}
