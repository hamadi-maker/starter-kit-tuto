'use server'

import bcryptjs from 'bcryptjs'

import type * as z from 'zod'

import { db } from '@/lib/db'

import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid Fields !' }
  }

  const { email, password, name } = validateFields.data
  const hashedPassword = await bcryptjs.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use !' }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return { success: 'Account created!' }
}
