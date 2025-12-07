'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  loadingComponent?: ReactNode
}

/**
 * ProtectedRoute Component
 * 
 * Wraps content that requires authentication.
 * Automatically redirects to login if user is not authenticated.
 * Shows loading state while checking authentication.
 * 
 * @param children - Content to render if authenticated
 * @param redirectTo - URL to redirect to if not authenticated (default: '/login')
 * @param loadingComponent - Custom loading component (optional)
 * 
 * @example
 * // Basic usage
 * <ProtectedRoute>
 *   <DashboardContent />
 * </ProtectedRoute>
 * 
 * @example
 * // Custom redirect
 * <ProtectedRoute redirectTo="/signin">
 *   <ProfilePage />
 * </ProtectedRoute>
 * 
 * @example
 * // Custom loading component
 * <ProtectedRoute loadingComponent={<CustomSpinner />}>
 *   <SettingsPage />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  redirectTo = '/login',
  loadingComponent,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth({ redirectTo })

  // Show loading state
  if (loading) {
    return (
      <>
        {loadingComponent || (
          <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading...
              </p>
            </div>
          </div>
        )}
      </>
    )
  }

  // Don't render content if not authenticated (redirect will happen)
  if (!user) {
    return null
  }

  // Render protected content
  return <>{children}</>
}

interface GuestOnlyRouteProps {
  children: ReactNode
  redirectTo?: string
  loadingComponent?: ReactNode
}

/**
 * GuestOnlyRoute Component
 * 
 * Wraps content that should only be accessible to unauthenticated users.
 * Automatically redirects to dashboard if user is authenticated.
 * Useful for login, signup, and forgot password pages.
 * 
 * @param children - Content to render if not authenticated
 * @param redirectTo - URL to redirect to if authenticated (default: '/dashboard')
 * @param loadingComponent - Custom loading component (optional)
 * 
 * @example
 * // On login page
 * <GuestOnlyRoute>
 *   <LoginForm />
 * </GuestOnlyRoute>
 * 
 * @example
 * // On signup page with custom redirect
 * <GuestOnlyRoute redirectTo="/onboarding">
 *   <SignupForm />
 * </GuestOnlyRoute>
 */
export function GuestOnlyRoute({
  children,
  redirectTo = '/dashboard',
  loadingComponent,
}: GuestOnlyRouteProps) {
  const { user, loading } = useAuth({
    redirectTo,
    redirectIfAuthenticated: true,
  })

  // Show loading state
  if (loading) {
    return (
      <>
        {loadingComponent || (
          <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading...
              </p>
            </div>
          </div>
        )}
      </>
    )
  }

  // Don't render content if authenticated (redirect will happen)
  if (user) {
    return null
  }

  // Render guest-only content
  return <>{children}</>
}
