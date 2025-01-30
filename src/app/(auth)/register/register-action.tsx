'use server'

import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcrypt-ts'
import { z } from 'zod'

const userFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

type UserFormData = z.infer<typeof userFormSchema>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function registerAction(_prevState: any, formData: FormData) {
  const userData = Object.fromEntries(formData.entries())

  const { data: user, success, error } = userFormSchema.safeParse(userData)

  if (!success && !user) {
    // console.info(error.flatten().formErrors)
    console.info(success, user)
    return {
      message: `You can't has input empty.`,
      success: false,
    }
  }

  const userAlreadyExists = await prisma.user.findUnique({
    where: { email: user.email },
  })

  if (userAlreadyExists) {
    console.error('User email already exists.')

    return {
      message: 'User email already exists.',
      success: false,
    }
  }

  const data = user as UserFormData

  data.password = hashSync(data.password, 6)

  await prisma.user.create({
    data,
  })

  return {
    message: 'Success! register user.',
    success: true,
  }
}
