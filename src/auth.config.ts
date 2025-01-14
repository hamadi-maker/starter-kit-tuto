// import type { NextAuthConfig } from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import bcryptjs from 'bcryptjs'

import type NextAuthConfig from 'next-auth'

import type { AuthOptions } from './../node_modules/next-auth/core/types.d'

import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jhon.doe@exemple.com' },
        password: { label: 'Password', type: 'password', placeholder: '*******' }
      },
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email, password } = validateFields.data
          const user = await getUserByEmail(email)

          if (!user || !user.password) return null

          const passwordMatch = await bcryptjs.compare(password, user.password)

          if (passwordMatch) return user
        }

        return null
      }
    })
  ]
} satisfies NextAuthConfig
