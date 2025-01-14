// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Register from '@/views/Register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your account'
}

const LoginPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <Register mode={mode} />
}

export default LoginPage