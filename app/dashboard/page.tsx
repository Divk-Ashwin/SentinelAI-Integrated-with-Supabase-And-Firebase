'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { LogOut, User, Shield } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, loading } = useRequireAuth()
  const { logout } = useAuth()
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    // Check if this is a new user
    const newUserFlag = sessionStorage.getItem('isNewUser')
    if (newUserFlag === 'true') {
      setIsNewUser(true)
      // Clear the flag
      sessionStorage.removeItem('isNewUser')
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SMS Phishing Detector
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isNewUser ? 'Welcome' : 'Welcome Back'}, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {user?.email}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                Authenticated
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Protected Route
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This dashboard is protected by the useRequireAuth hook. Only authenticated users can access this page.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              User Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your authentication state is managed globally through AuthContext. User data is available throughout the app.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Auto Redirect
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              If you sign out, you'll be automatically redirected to the login page. Try it with the button above!
            </p>
          </div>
        </div>

        {/* User Info Debug */}
        <div className="mt-8 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Information
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                {user?.uid}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.email}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Display Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.displayName || 'Not set'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Photo URL
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white truncate">
                {user?.photoURL || 'No photo'}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  )
}
