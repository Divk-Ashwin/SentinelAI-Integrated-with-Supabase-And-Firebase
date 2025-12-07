'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth as useAuthContext } from '@/lib/contexts/AuthContext'
import type { User } from '@/lib/contexts/AuthContext'

interface UseAuthReturnType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

interface UseProtectedRouteOptions {
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

/**
 * Custom hook for authentication checks with automatic redirects
 * 
 * @param options - Configuration options
 * @param options.redirectTo - URL to redirect to if not authenticated (default: '/login')
 * @param options.redirectIfAuthenticated - Redirect if user IS authenticated (default: false)
 * @returns Object containing user, loading state, and authentication status
 * 
 * @example
 * // Protect a dashboard route
 * const { user, loading } = useAuth()
 * 
 * @example
 * // Redirect to custom page
 * const { user, loading } = useAuth({ redirectTo: '/signin' })
 * 
 * @example
 * // Redirect authenticated users (e.g., on login page)
 * const { user, loading } = useAuth({ 
 *   redirectTo: '/dashboard', 
 *   redirectIfAuthenticated: true 
 * })
 */
export function useAuth(options: UseProtectedRouteOptions = {}): UseAuthReturnType {
  const {
    redirectTo = '/login',
    redirectIfAuthenticated = false,
  } = options

  const router = useRouter()
  const { user, loading } = useAuthContext()
  const isAuthenticated = !!user

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return

    // Redirect unauthenticated users to login
    if (!redirectIfAuthenticated && !isAuthenticated) {
      console.log('User not authenticated, redirecting to:', redirectTo)
      router.push(redirectTo)
      return
    }

    // Redirect authenticated users away (e.g., from login page)
    if (redirectIfAuthenticated && isAuthenticated) {
      console.log('User already authenticated, redirecting to:', redirectTo)
      router.push(redirectTo)
      return
    }
  }, [user, loading, isAuthenticated, redirectTo, redirectIfAuthenticated, router])

  return {
    user,
    loading,
    isAuthenticated,
  }
}

/**
 * Hook for protecting routes without automatic redirects
 * Just returns authentication state for manual handling
 * 
 * @returns Object containing user, loading state, and authentication status
 * 
 * @example
 * const { user, loading, isAuthenticated } = useAuthState()
 * if (!loading && !isAuthenticated) {
 *   return <LoginPrompt />
 * }
 */
export function useAuthState(): UseAuthReturnType {
  const { user, loading } = useAuthContext()
  const isAuthenticated = !!user

  return {
    user,
    loading,
    isAuthenticated,
  }
}

/**
 * Hook specifically for protecting routes (requires authentication)
 * Automatically redirects to login if not authenticated
 * 
 * @param redirectTo - URL to redirect to if not authenticated (default: '/login')
 * @returns Object containing user and loading state
 * 
 * @example
 * const { user, loading } = useRequireAuth()
 */
export function useRequireAuth(redirectTo: string = '/login') {
  return useAuth({ redirectTo, redirectIfAuthenticated: false })
}

/**
 * Hook for pages that should only be accessed by unauthenticated users
 * Automatically redirects to dashboard if authenticated
 * 
 * @param redirectTo - URL to redirect to if authenticated (default: '/dashboard')
 * @returns Object containing user and loading state
 * 
 * @example
 * // On login page
 * const { user, loading } = useRequireGuest()
 */
export function useRequireGuest(redirectTo: string = '/dashboard') {
  return useAuth({ redirectTo, redirectIfAuthenticated: true })
}
