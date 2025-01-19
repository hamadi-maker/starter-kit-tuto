'use client'

import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import { setUser, clearUser } from '@/store/slices/authSlice'

const useAuthSync = () => {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()

  console.log(' session from custum hook ', session)
  console.log(' user from custum hook ', session?.user)

  console.log(' status from custum hook ', status)
  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(setUser(session.user))
    } else if (status === 'unauthenticated') {
      dispatch(clearUser())
    }
  }, [session, status, dispatch])
}

export default useAuthSync
