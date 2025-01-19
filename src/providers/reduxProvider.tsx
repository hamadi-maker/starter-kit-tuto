'use client'

import type { ReactNode } from 'react'

import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

import store from '../store/store'

export default function Providers({ children, session }: { children: ReactNode; session?: any }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
