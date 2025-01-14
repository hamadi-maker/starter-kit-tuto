import type { NextRequest } from 'next/server'

import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'

interface AuthRequest extends NextRequest {
  auth?: { user: any } // Customize based on your auth structure
}

const { auth } = NextAuth(authConfig)

export default auth((req: AuthRequest): any => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPulicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return null
  }

  if (!isLoggedIn && !isPulicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
