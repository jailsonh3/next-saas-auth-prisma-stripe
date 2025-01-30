import NextAuth from 'next-auth'
import Credential from 'next-auth/providers/credentials'
import { findUserByCredentials } from './app/api/auth/auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credential({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credential) => {
        const user = await findUserByCredentials(
          credential.email as string,
          credential.password as string,
        )

        return user
      },
    }),
  ],
})
