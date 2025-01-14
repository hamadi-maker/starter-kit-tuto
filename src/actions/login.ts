'use server'

import type * as z from 'zod'

import AuthError from 'next-auth'

import { signIn } from '@/auth'

import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validateFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Somthing wen wrong !' }
      }
    }

    console.error('Unexpected error:', error)

    return { error: 'An unexpected error occurred' }

    throw error
  }
}
