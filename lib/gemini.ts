import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY || ''

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)

export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function analyzeImage(imageData: string, prompt: string) {
  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg',
        },
      },
    ])
    
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error)
    throw error
  }
}

export async function analyzeFoodSafety(imageData: string) {
  const prompt = `Analyze this food image for safety concerns. Consider:
- Visual signs of spoilage (mold, discoloration, unusual texture)
- Proper storage indicators
- Packaging integrity
- Expiration date visibility
- Overall safety assessment (Safe/Caution/Unsafe)
- Specific recommendations

Provide a detailed analysis with a safety score from 0-100.`

  return analyzeImage(imageData, prompt)
}
