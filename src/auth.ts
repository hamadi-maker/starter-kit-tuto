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
    // async signIn({ user }){
    //   const existingUser = await getUserById(user.id as string)

    //   if (!existingUser || !existingUser.emailVerified) return false ;

    //   return true;
    // },

    async session({ token, session }: any) {
      console.log({ sessionToken: token })

      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'ADMIN' | 'USER'
      }

      return session
    },

    async jwt({ token }: any) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
