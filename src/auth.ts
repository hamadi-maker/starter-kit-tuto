import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth from 'next-auth'

// import  { DefaultSession } from 'next-auth'

import authConfig from '@/auth.config'
import { db } from './lib/db'
import { getUserById } from '@/data/user'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = (token.role as 'ADMIN') || 'USER'
        session.user.name = token.name
        session.user.email = token.email ?? ''
        session.user.image = token.image as string | null | undefined
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      // Fetch the latest user data from the database
      const existingUser = await getUserById(token.sub)

      if (existingUser) {
        token.role = existingUser.role
        token.name = existingUser.name
        token.email = existingUser.email
        token.image = existingUser.image // Use your updated field
      }

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
