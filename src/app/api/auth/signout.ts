// pages/api/auth/signout.ts
'use server'

import { auth, signOut } from '@/auth'

export const getUserSession = async () => {
  const session = await auth()

  console.log(JSON.stringify(session?.user))

  return JSON.stringify(session?.user)
}

export const handleSignOut = async (): Promise<void> => {
  try {
    await signOut({ redirect: false })
    console.log('User signed out successfully.')
  } catch (error) {
    console.error('Error during sign-out:', error)
  }
}
