import Tesseract from 'tesseract.js'

export async function extractTextFromImage(imageFile: File): Promise<string> {
  try {
    const result = await Tesseract.recognize(imageFile, 'eng', {
      logger: (m) => console.log(m),
    })
    return result.data.text
  } catch (error) {
    console.error('OCR Error:', error)
    throw new Error('Failed to extract text from image')
  }
}

export async function extractTextFromImageUrl(imageUrl: string): Promise<string> {
  try {
    const result = await Tesseract.recognize(imageUrl, 'eng')
    return result.data.text
  } catch (error) {
    console.error('OCR Error:', error)
    throw new Error('Failed to extract text from image URL')
  }
}
