import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required'
  }),
  name: z.string().min(6, {
    message: 'Name is required'
  })
})

export const UserSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(6, {
    message: 'password required'
  }),
  image: z
    .string()
    .url({
      message: 'Image must be a valid URL'
    })
    .optional(),
  name: z.string().min(6, {
    message: 'Name is required'
  })
})
