import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      }
    })

    return user
  } catch {
    return null
  }
}

// export const getAllUsers = async () => {
//   try {
//     const users = await db.user.findMany()

//     console.log('users from data : ', users)

//     return users
//   } catch {
//     return null
//   }
// }

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany()

    console.log('users from data: ', users)

    if (!users || users.length === 0) {
      console.log('No users found.')

      return null // Explicitly handle empty data case
    }

    return users
  } catch (error) {
    console.error('Error fetching users: ', error)

    return null // Handle errors explicitly
  }
}
