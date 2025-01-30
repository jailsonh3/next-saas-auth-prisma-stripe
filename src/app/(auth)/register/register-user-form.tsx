'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Form from 'next/form'
import { redirect } from 'next/navigation'
import { useActionState } from 'react'
import { registerAction } from './register-action'

export default function RegisterUserForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  if (state?.success) {
    redirect('/sign-in')
  }

  return (
    <>
      {state?.success === false && (
        <div className="relative mb-5 flex flex-col rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 text-xs">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{state.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div>
          <Label>Nome</Label>
          <Input type="text" placeholder="Fulano de Tal" name="name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="eu@exemplo.com" name="email" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" placeholder="********" name="password" />
        </div>
        <div>
          <Button disabled={isPending} className="mt-6 w-full" type="submit">
            Registrar
          </Button>
        </div>
      </Form>
    </>
  )
}
