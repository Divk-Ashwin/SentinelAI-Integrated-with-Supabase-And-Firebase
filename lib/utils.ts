/**
 * Convert a File object to a base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      } else {
        reject(new Error('Failed to convert file to base64'))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Get status color for safety score
 */
export function getStatusColor(status: 'safe' | 'caution' | 'unsafe'): string {
  switch (status) {
    case 'safe':
      return 'text-green-600'
    case 'caution':
      return 'text-yellow-600'
    case 'unsafe':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

/**
 * Determine safety status from score
 */
export function getSafetyStatus(score: number): 'safe' | 'caution' | 'unsafe' {
  if (score >= 70) return 'safe'
  if (score >= 40) return 'caution'
  return 'unsafe'
}

/**
 * Validate image file
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  return validTypes.includes(file.type) && file.size <= maxSize
}
