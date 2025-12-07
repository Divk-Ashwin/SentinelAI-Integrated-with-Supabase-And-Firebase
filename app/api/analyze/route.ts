import { NextRequest, NextResponse } from 'next/server'
import { analyzeFoodSafety } from '@/lib/gemini'
import { getSafetyStatus } from '@/lib/utils'
import { AnalysisResult } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    // Analyze the image with Gemini
    const rawResponse = await analyzeFoodSafety(imageData)

    // Parse the response (this is a simple implementation)
    // In production, you'd want more sophisticated parsing
    const safetyScore = extractSafetyScore(rawResponse)
    const status = getSafetyStatus(safetyScore)
    const findings = extractFindings(rawResponse)
    const recommendations = extractRecommendations(rawResponse)

    const result: AnalysisResult = {
      safetyScore,
      status,
      findings,
      recommendations,
      rawResponse,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    )
  }
}

function extractSafetyScore(text: string): number {
  // Look for patterns like "score: 85" or "85/100"
  const scoreMatch = text.match(/(?:score|safety)[:\s]*(\d+)(?:\/100)?/i)
  if (scoreMatch) {
    return parseInt(scoreMatch[1], 10)
  }
  
  // Default scoring based on keywords
  const lowerText = text.toLowerCase()
  if (lowerText.includes('safe') && !lowerText.includes('unsafe')) {
    return 85
  } else if (lowerText.includes('caution') || lowerText.includes('warning')) {
    return 55
  } else if (lowerText.includes('unsafe') || lowerText.includes('danger')) {
    return 25
  }
  
  return 50 // Default neutral score
}

function extractFindings(text: string): string[] {
  const findings: string[] = []
  
  // Look for bullet points or numbered lists
  const lines = text.split('\n')
  let inFindingsSection = false
  
  for (const line of lines) {
    if (line.toLowerCase().includes('finding') || 
        line.toLowerCase().includes('observation') ||
        line.toLowerCase().includes('visual signs')) {
      inFindingsSection = true
      continue
    }
    
    if (line.toLowerCase().includes('recommendation')) {
      inFindingsSection = false
    }
    
    if (inFindingsSection && (line.trim().startsWith('-') || 
        line.trim().startsWith('•') || 
        line.trim().match(/^\d+\./))) {
      findings.push(line.trim().replace(/^[-•]\s*|\d+\.\s*/, ''))
    }
  }
  
  // If no structured findings found, add a summary
  if (findings.length === 0) {
    findings.push(text.substring(0, 200) + '...')
  }
  
  return findings
}

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = []
  
  const lines = text.split('\n')
  let inRecommendationsSection = false
  
  for (const line of lines) {
    if (line.toLowerCase().includes('recommendation') || 
        line.toLowerCase().includes('suggest')) {
      inRecommendationsSection = true
      continue
    }
    
    if (inRecommendationsSection && (line.trim().startsWith('-') || 
        line.trim().startsWith('•') || 
        line.trim().match(/^\d+\./))) {
      recommendations.push(line.trim().replace(/^[-•]\s*|\d+\.\s*/, ''))
    }
  }
  
  // Default recommendations based on common safety practices
  if (recommendations.length === 0) {
    recommendations.push('Store food at appropriate temperature')
    recommendations.push('Check expiration dates regularly')
    recommendations.push('Follow proper food handling guidelines')
  }
  
  return recommendations
}
