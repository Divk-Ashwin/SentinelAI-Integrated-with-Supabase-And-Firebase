// Re-export User type from AuthContext for consistency
export type { User } from '@/lib/contexts/AuthContext'

export interface FoodAnalysis {
  id: string
  userId: string
  imageUrl: string
  safetyScore: number
  status: 'safe' | 'caution' | 'unsafe'
  findings: string[]
  recommendations: string[]
  analyzedAt: Date
  ocrText?: string
}

export interface UploadedFile {
  file: File
  preview: string
}

export interface SafetyMeterProps {
  score: number
  status: 'safe' | 'caution' | 'unsafe'
}

export interface AnalysisResult {
  safetyScore: number
  status: 'safe' | 'caution' | 'unsafe'
  findings: string[]
  recommendations: string[]
  rawResponse: string
}
