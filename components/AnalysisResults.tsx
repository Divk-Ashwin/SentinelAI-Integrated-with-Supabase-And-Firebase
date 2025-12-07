'use client'

import React from 'react'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { AnalysisResult } from '@/types'

interface AnalysisResultsProps {
  result: AnalysisResult
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'safe':
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case 'caution':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
      case 'unsafe':
        return <AlertCircle className="h-6 w-6 text-red-600" />
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <h2 className="text-2xl font-bold">Analysis Results</h2>
      </div>

      {result.findings.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-3">Findings</h3>
          <ul className="space-y-2">
            {result.findings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">→</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
