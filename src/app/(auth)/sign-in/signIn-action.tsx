'use server'

import { signIn } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function signInAction(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)

  try {
    await signIn('credentials', { ...data, redirectTo: '/dashboard' })
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error
    }

    if (error?.type === 'CredentialsSignin') {
      return { success: false, message: 'Credential Invalid' }
    }

    return { success: false, message: 'Internal Erro!' }
  }
}
