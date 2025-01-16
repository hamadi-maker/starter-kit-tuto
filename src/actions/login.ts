'use server'

import type * as z from 'zod'

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
      password
    })

    return { success: 'logged in' }
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error) {
    //     case 'CredentialsSignin':
    //       return { error: 'Invalid credentials' }
    //     default:
    //       return { error: 'Something wen wrong !' }
    //   }
    // }

    // console.error('Unexpected error:', error)
    if (error) {
      return { error: 'Invalid credentials' }
    }

    throw error
  }
}
