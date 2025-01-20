'use client'

import { useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import { setUser, clearUser } from '@/store/slices/authSlice'

const useAuthSync = () => {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const initialized = useRef(false) // Prevent multiple dispatches

  useEffect(() => {
    if (initialized.current) return // Skip if already initialized

    if (status === 'authenticated' && session?.user) {
      dispatch(setUser(session.user))
      initialized.current = true // Mark as initialized
    } else if (status === 'unauthenticated') {
      dispatch(clearUser())
    }
  }, [status, session?.user, dispatch])
}

export default useAuthSync
