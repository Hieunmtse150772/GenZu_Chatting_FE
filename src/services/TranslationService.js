// src/services/translationService.js
import axios from 'axios'

const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATION_API_KEY_TRANSLATION
const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

export const translateText = async (
  text = 'GenzuChat Là số 1 trên thế giới',
  targetLang = 'en',
) => {
  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLang,
    })

    if (response.data.data && response.data.data.translations) {
      console.log(response.data.data.translations[0].translatedText)
      return response.data.data.translations[0].translatedText
    } else {
      throw new Error('Unexpected response format from translation service')
    }
  } catch (error) {
    console.error('Error translating text:', error)
    throw error // Rethrow the error to propagate it further
  }
}
