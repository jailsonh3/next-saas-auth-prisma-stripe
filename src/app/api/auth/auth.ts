import { prisma } from '@/lib/prisma'
import { compareSync } from 'bcrypt-ts'

type UserResponse = {
  name: string | null
  email: string
}

export async function findUserByCredentials(email: string, password: string): Promise<UserResponse | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.info('Credentials Invalid')
    return null
  }

  const userMatchPassword = compareSync(password, user.password)

  if (!userMatchPassword) {
    console.info('Credentials Invalid')
    return null
  }

  return {
    name: user.name,
    email: user.email,
  }
}
