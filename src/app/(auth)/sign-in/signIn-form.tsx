'use client'

import Form from 'next/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { signInAction } from './signIn-action'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null)

  // if (state?.success) {
  //   redirect('/dashboard')
  // }

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
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" />
        </div>
        <div>
          <Button disabled={isPending} className="mt-6 w-full" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
  )
}
