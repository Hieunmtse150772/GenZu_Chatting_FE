import { GoogleGenerativeAI } from '@google/generative-ai'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY)

export async function answerSuggestion(question) {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.0-pro-001',
  })

  const prompt = `Suggest answer for ${question}`

  const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()
  return text
}
