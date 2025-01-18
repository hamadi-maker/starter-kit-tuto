'use server'

import type * as z from 'zod'

import bcryptjs from 'bcryptjs'

import { UserSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const Update = async (values: z.infer<typeof UserSchema>) => {
  const validateFields = UserSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password, image, name } = validateFields.data

  const existingUser = await getUserByEmail(email)

  console.log('this image from action', image)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  if (existingUser?.email === email && existingUser?.name === name && existingUser?.image === image) {
    return { error: 'You Need to change email or name or image to update your profile' }
  }

  const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password || '')

  if (isPasswordCorrect) {
    await db.user.update({
      where: {
        id: existingUser?.id
      },
      data: {
        name,
        image,
        email
      }
    })

    return { success: 'Profile updated!' }
  } else {
    return { error: 'password incorrect !' }
  }
}
