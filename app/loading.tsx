import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loading...',
}

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <div className="inline-block relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-500"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-400">
          Loading SMS Phishing Detector...
        </p>
      </div>
    </div>
  )
}
